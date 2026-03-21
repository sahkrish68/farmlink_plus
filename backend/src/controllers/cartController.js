const pool = require('../config/db');
const { ok, fail } = require('../utils/response');
const { BUYER_ROLES, canBuyFrom } = require('../utils/roles');

async function getOrCreateCart(userId) {
  const [rows] = await pool.query('SELECT * FROM carts WHERE user_id = ?', [userId]);

  if (rows.length) return rows[0].id;

  const [result] = await pool.query('INSERT INTO carts (user_id) VALUES (?)', [userId]);
  return result.insertId;
}

async function getCart(req, res) {
  try {
    const cartId = await getOrCreateCart(req.user.id);

    const [rows] = await pool.query(
      `SELECT
          ci.quantity,
          p.id,
          p.name,
          p.slug,
          p.category,
          p.description,
          p.image,
          p.available_quantity,
          p.unit,
          p.price,
          p.min_order_quantity,
          p.stock_status,
          p.delivery_option,
          p.delivery_area,
          p.expiry_date,
          p.city,
          p.seller_id,
          p.is_active,
          p.created_at,
          u.full_name AS seller_name,
          u.role AS seller_role
       FROM cart_items ci
       JOIN products p ON p.id = ci.product_id
       JOIN users u ON u.id = p.seller_id
       WHERE ci.cart_id = ?`,
      [cartId]
    );

    const items = rows.map((row) => ({
      product: {
        id: row.id,
        name: row.name,
        slug: row.slug,
        category: row.category,
        description: row.description,
        image: row.image,
        available_quantity: row.available_quantity,
        unit: row.unit,
        price: row.price,
        min_order_quantity: row.min_order_quantity,
        stock_status: row.stock_status,
        delivery_option: row.delivery_option,
        delivery_area: row.delivery_area,
        expiry_date: row.expiry_date,
        city: row.city,
        seller_id: row.seller_id,
        seller_name: row.seller_name,
        seller_role: row.seller_role,
        is_active: row.is_active,
        created_at: row.created_at,
      },
      quantity: row.quantity,
    }));

    const total = items.reduce(
      (sum, item) => sum + Number(item.quantity) * Number(item.product.price),
      0
    );

    return ok(res, { items, total });
  } catch (error) {
    console.error('getCart error:', error);
    return res.status(500).json({ message: error.message || 'Failed to load cart' });
  }
}

async function addToCart(req, res) {
  try {
    if (!BUYER_ROLES.includes(req.user.role)) {
      return fail(res, 'Only buyers can use cart', 403);
    }

    const { productId, quantity = 1 } = req.body;

    const [productRows] = await pool.query(
      `SELECT p.*, u.role AS seller_role
       FROM products p
       JOIN users u ON u.id = p.seller_id
       WHERE p.id = ?`,
      [productId]
    );

    if (!productRows.length) return fail(res, 'Product not found', 404);

    const product = productRows[0];

    if (!canBuyFrom(req.user.role, product.seller_role)) {
      return fail(res, 'You are not allowed to buy this product', 403);
    }

    const cartId = await getOrCreateCart(req.user.id);

    const [exists] = await pool.query(
      'SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?',
      [cartId, productId]
    );

    if (exists.length) {
      await pool.query(
        'UPDATE cart_items SET quantity = quantity + ? WHERE cart_id = ? AND product_id = ?',
        [quantity, cartId, productId]
      );
    } else {
      await pool.query(
        'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)',
        [cartId, productId, quantity]
      );
    }

    return ok(res, { message: 'Added to cart' }, 201);
  } catch (error) {
    console.error('addToCart error:', error);
    return res.status(500).json({ message: error.message || 'Failed to add to cart' });
  }
}

async function updateCartItem(req, res) {
  try {
    const cartId = await getOrCreateCart(req.user.id);
    const quantity = Number(req.body.quantity);

    if (!quantity || quantity < 1) {
      return fail(res, 'Quantity must be at least 1', 400);
    }

    await pool.query(
      'UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?',
      [quantity, cartId, req.params.productId]
    );

    return ok(res, { message: 'Cart updated' });
  } catch (error) {
    console.error('updateCartItem error:', error);
    return res.status(500).json({ message: error.message || 'Failed to update cart' });
  }
}

async function removeCartItem(req, res) {
  try {
    const cartId = await getOrCreateCart(req.user.id);

    await pool.query(
      'DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?',
      [cartId, req.params.productId]
    );

    return ok(res, { message: 'Item removed' });
  } catch (error) {
    console.error('removeCartItem error:', error);
    return res.status(500).json({ message: error.message || 'Failed to remove item' });
  }
}

async function clearCart(req, res) {
  try {
    const cartId = await getOrCreateCart(req.user.id);

    await pool.query('DELETE FROM cart_items WHERE cart_id = ?', [cartId]);

    return ok(res, { message: 'Cart cleared' });
  } catch (error) {
    console.error('clearCart error:', error);
    return res.status(500).json({ message: error.message || 'Failed to clear cart' });
  }
}

module.exports = { getCart, addToCart, updateCartItem, removeCartItem, clearCart };