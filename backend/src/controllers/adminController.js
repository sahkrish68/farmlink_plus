const pool = require('../config/db');
const { ok } = require('../utils/response');

async function stats(req, res) {
  const [[users]] = await pool.query('SELECT COUNT(*) AS totalUsers, SUM(role="farmer") AS farmers, SUM(role="restaurant") AS restaurants, SUM(role="industrial") AS industrials, SUM(role="customer") AS customers FROM users');
  const [[products]] = await pool.query('SELECT COUNT(*) AS totalProducts FROM products');
  const [[orders]] = await pool.query('SELECT COUNT(*) AS totalOrders, COALESCE(SUM(total_amount),0) AS revenue FROM orders');
  return ok(res, { users, products, orders });
}

async function listUsers(req, res) {
  const role = req.query.role || '';
  const search = req.query.search || '';
  const params = [`%${search}%`, `%${search}%`];
  let sql = 'SELECT id, full_name, email, phone, role, status, city, created_at FROM users WHERE (full_name LIKE ? OR email LIKE ?)';
  if (role) { sql += ' AND role = ?'; params.push(role); }
  sql += ' ORDER BY created_at DESC';
  const [rows] = await pool.query(sql, params);
  return ok(res, rows);
}

async function updateUser(req, res) {
  const { status, role } = req.body;
  await pool.query('UPDATE users SET status = COALESCE(?, status), role = COALESCE(?, role) WHERE id = ?', [status || null, role || null, req.params.id]);
  return ok(res, { message: 'User updated' });
}

async function deactivateUser(req, res) {
  await pool.query('UPDATE users SET status="inactive" WHERE id=?', [req.params.id]);
  return ok(res, { message: 'User deactivated' });
}

async function listAdminOrders(req, res) {
  const [rows] = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
  return ok(res, rows);
}

module.exports = { stats, listUsers, updateUser, deactivateUser, listAdminOrders };
