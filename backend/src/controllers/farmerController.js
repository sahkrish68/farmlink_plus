const pool = require('../config/db');
const { ok, fail } = require('../utils/response');

async function listFarmers(req, res) {
  const search = req.query.search || '';
  const [farmers] = await pool.query(
    `SELECT id, full_name, email, phone, city, address, business_name, business_type, avatar, created_at
     FROM users
     WHERE role = 'farmer'
       AND status = 'active'
       AND (full_name LIKE ? OR city LIKE ? OR business_name LIKE ?)
     ORDER BY created_at DESC`,
    [`%${search}%`, `%${search}%`, `%${search}%`]
  );

  return ok(res, { farmers, total: farmers.length });
}

async function getFarmer(req, res) {
  const [farmers] = await pool.query(
    `SELECT id, full_name, email, phone, city, address, business_name, business_type, avatar, created_at
     FROM users
     WHERE id = ? AND role = 'farmer'`,
    [req.params.id]
  );

  if (!farmers.length) {
    return fail(res, 'Farmer not found', 404);
  }

  const [products] = await pool.query(
    `SELECT * FROM products
     WHERE seller_id = ? AND is_active = 1
     ORDER BY created_at DESC`,
    [req.params.id]
  );

  return ok(res, { farmer: farmers[0], products });
}

module.exports = { listFarmers, getFarmer };