const pool = require('../config/db');
const { ok } = require('../utils/response');

async function listNotifications(req, res) {
  const [rows] = await pool.query('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
  return ok(res, { notifications: rows });
}

async function markRead(req, res) {
  await pool.query('UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
  return ok(res, { message: 'Notification marked as read' });
}

module.exports = { listNotifications, markRead };
