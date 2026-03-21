const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const { ok, fail } = require('../utils/response');
const { mapUser } = require('./authController');

async function getProfile(req, res) {
  return ok(res, { user: mapUser(req.user) });
}

async function updateProfile(req, res) {
  const { name, phone, address, city, country, businessName, businessType, licenseNumber, operatingHours, preferredContact } = req.body;
  await pool.query(
    `UPDATE users SET full_name=?, phone=?, address=?, city=?, country=?, business_name=?, business_type=?, license_number=?, operating_hours=?, preferred_contact=? WHERE id=?`,
    [name || req.user.full_name, phone || null, address || null, city || null, country || null, businessName || null, businessType || null, licenseNumber || null, operatingHours || null, preferredContact || null, req.user.id]
  );
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id]);
  return ok(res, { message: 'Profile updated', user: mapUser(rows[0]) });
}

async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) return fail(res, 'Current and new password are required');
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id]);
  const user = rows[0];
  const match = await bcrypt.compare(currentPassword, user.password_hash);
  if (!match) return fail(res, 'Current password is incorrect', 400);
  const hashed = await bcrypt.hash(newPassword, 10);
  await pool.query('UPDATE users SET password_hash=? WHERE id=?', [hashed, req.user.id]);
  return ok(res, { message: 'Password changed successfully' });
}

async function uploadAvatar(req, res) {
  if (!req.file) return fail(res, 'Avatar file is required');
  const avatar = `/uploads/${req.file.filename}`;
  await pool.query('UPDATE users SET avatar=? WHERE id=?', [avatar, req.user.id]);
  return ok(res, { message: 'Avatar uploaded', avatar });
}

module.exports = { getProfile, updateProfile, changePassword, uploadAvatar };
