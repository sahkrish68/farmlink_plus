const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { fail } = require('../utils/response');

async function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return fail(res, 'Unauthorized', 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [rows] = await pool.query('SELECT id, full_name, email, phone, role, status, avatar, address, city, country, business_name, business_type, license_number, operating_hours, preferred_contact, created_at FROM users WHERE id = ?', [decoded.id]);
    if (!rows.length) return fail(res, 'User not found', 401);
    if (rows[0].status !== 'active') return fail(res, 'Account is inactive', 403);
    req.user = rows[0];
    next();
  } catch (error) {
    return fail(res, 'Invalid token', 401);
  }
}

function permit(...roles) {
  return (req, res, next) => {
    if (!req.user) return fail(res, 'Unauthorized', 401);
    if (!roles.includes(req.user.role)) return fail(res, 'Forbidden', 403);
    next();
  };
}

module.exports = { auth, permit };
