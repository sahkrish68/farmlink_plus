const pool = require('../config/db');
const { ok } = require('../utils/response');

async function inbox(req, res) {
  const [threads] = await pool.query(
    `SELECT CASE WHEN sender_id = ? THEN receiver_id ELSE sender_id END AS other_user_id, MAX(created_at) AS last_message_at
     FROM messages WHERE sender_id = ? OR receiver_id = ? GROUP BY other_user_id ORDER BY last_message_at DESC`,
    [req.user.id, req.user.id, req.user.id]
  );
  return ok(res, { threads });
}

async function thread(req, res) {
  const otherUserId = req.params.userId;
  const [messages] = await pool.query(
    `SELECT * FROM messages
     WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)
     ORDER BY created_at ASC`,
    [req.user.id, otherUserId, otherUserId, req.user.id]
  );
  return ok(res, { messages });
}

async function send(req, res) {
  const { receiverId, text, productId } = req.body;
  const [result] = await pool.query('INSERT INTO messages (sender_id, receiver_id, product_id, text) VALUES (?, ?, ?, ?)', [req.user.id, receiverId, productId || null, text]);
  return ok(res, { message: 'Message sent', id: result.insertId }, 201);
}

async function unreadCount(req, res) {
  const [[row]] = await pool.query('SELECT COUNT(*) AS count FROM messages WHERE receiver_id = ? AND is_read = 0', [req.user.id]);
  return ok(res, { count: row.count });
}

module.exports = { inbox, thread, send, unreadCount };
