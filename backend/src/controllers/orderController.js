const pool = require('../config/db');
const { ok, fail } = require('../utils/response');
const { BUYER_ROLES, SELLER_ROLES, canBuyFrom } = require('../utils/roles');

async function placeOrder(req, res) {
  const { items = [], shippingAddress, notes } = req.body;
  if (!BUYER_ROLES.includes(req.user.role)) return fail(res, 'Only buyers can place orders', 403);
  if (!items.length) return fail(res, 'At least one item is required');

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    let totalAmount = 0;
    const preparedItems = [];

    for (const item of items) {
      const [productRows] = await connection.query(
        `SELECT p.*, u.full_name AS seller_name, u.role AS seller_role
         FROM products p JOIN users u ON u.id = p.seller_id WHERE p.id = ? LIMIT 1`,
        [item.productId]
      );
      if (!productRows.length) throw new Error(`Product ${item.productId} not found`);
      const product = productRows[0];
      if (!canBuyFrom(req.user.role, product.seller_role)) throw new Error(`You cannot buy ${product.name} from ${product.seller_role}`);
      if (Number(item.quantity) > Number(product.available_quantity)) throw new Error(`Insufficient stock for ${product.name}`);
      const lineTotal = Number(product.price) * Number(item.quantity);
      totalAmount += lineTotal;
      preparedItems.push({ product, quantity: Number(item.quantity), lineTotal });
    }

    const [orderResult] = await connection.query(
      `INSERT INTO orders (buyer_id, status, total_amount, shipping_city, shipping_address, shipping_phone, notes)
       VALUES (?, 'Pending', ?, ?, ?, ?, ?)`,
      [req.user.id, totalAmount, shippingAddress?.city || null, shippingAddress?.address || null, shippingAddress?.phone || null, notes || null]
    );

    for (const item of preparedItems) {
      await connection.query(
        `INSERT INTO order_items (order_id, product_id, seller_id, quantity, unit_price, line_total)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [orderResult.insertId, item.product.id, item.product.seller_id, item.quantity, item.product.price, item.lineTotal]
      );
      await connection.query('UPDATE products SET available_quantity = available_quantity - ? WHERE id = ?', [item.quantity, item.product.id]);
      await connection.query('INSERT INTO notifications (user_id, title, message, type) VALUES (?, ?, ?, ?)', [item.product.seller_id, 'New order received', `You received a new order for ${item.product.name}`, 'order']);
    }

    await connection.query('INSERT INTO notifications (user_id, title, message, type) VALUES (?, ?, ?, ?)', [req.user.id, 'Order placed', `Your order #${orderResult.insertId} has been placed successfully`, 'order']);
    await connection.commit();
    return ok(res, { message: 'Order placed successfully', orderId: String(orderResult.insertId) }, 201);
  } catch (error) {
    await connection.rollback();
    return fail(res, error.message, 400);
  } finally {
    connection.release();
  }
}

async function listOrders(req, res) {
  let query = '';
  let params = [];
  if (req.user.role === 'admin') {
    query = 'SELECT * FROM orders ORDER BY created_at DESC';
  } else if (BUYER_ROLES.includes(req.user.role)) {
    query = 'SELECT * FROM orders WHERE buyer_id = ? ORDER BY created_at DESC';
    params = [req.user.id];
  } else if (SELLER_ROLES.includes(req.user.role)) {
    query = `SELECT DISTINCT o.* FROM orders o JOIN order_items oi ON oi.order_id = o.id WHERE oi.seller_id = ? ORDER BY o.created_at DESC`;
    params = [req.user.id];
  } else {
    return fail(res, 'Forbidden', 403);
  }

  const [orders] = await pool.query(query, params);
  return ok(res, { orders, total: orders.length });
}

async function getOrder(req, res) {
  const { id } = req.params;
  const [orders] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);
  if (!orders.length) return fail(res, 'Order not found', 404);
  const order = orders[0];
  const [items] = await pool.query(
    `SELECT oi.*, p.name AS product_name, p.slug, u.full_name AS seller_name
     FROM order_items oi
     JOIN products p ON p.id = oi.product_id
     JOIN users u ON u.id = oi.seller_id
     WHERE oi.order_id = ?`,
    [id]
  );
  return ok(res, { order: { ...order, items } });
}

async function updateOrderStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  const allowed = ['Pending', 'Confirmed', 'Processing', 'Delivered', 'Cancelled'];
  if (!allowed.includes(status)) return fail(res, 'Invalid status');

  const [items] = await pool.query('SELECT * FROM order_items WHERE order_id = ?', [id]);
  if (!items.length) return fail(res, 'Order not found', 404);

  // Only seller roles can update order status
  if (!SELLER_ROLES.includes(req.user.role)) {
    return fail(res, 'Only sellers can update order status', 403);
  }

  // Seller can update only their own order items/orders
  if (!items.some((i) => i.seller_id === req.user.id)) {
    return fail(res, 'Forbidden', 403);
  }

  await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);

  const [orders] = await pool.query('SELECT buyer_id FROM orders WHERE id = ?', [id]);
  const buyerId = orders[0].buyer_id;

  await pool.query(
    'INSERT INTO notifications (user_id, title, message, type) VALUES (?, ?, ?, ?)',
    [buyerId, 'Order status updated', `Your order #${id} is now ${status}`, 'order']
  );

  return ok(res, { message: 'Order status updated' });
}

async function cancelOrder(req, res) {
  const { id } = req.params;
  const [orders] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);
  if (!orders.length) return fail(res, 'Order not found', 404);
  const order = orders[0];
  if (order.buyer_id !== req.user.id && req.user.role !== 'admin') return fail(res, 'Forbidden', 403);
  await pool.query('UPDATE orders SET status="Cancelled" WHERE id=?', [id]);
  return ok(res, { message: 'Order cancelled' });
}

module.exports = { placeOrder, listOrders, getOrder, updateOrderStatus, cancelOrder };
