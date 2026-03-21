const pool = require('../config/db');
const { ok } = require('../utils/response');

async function getWishlist(req, res) {
  const [products] = await pool.query(
    `SELECT p.* FROM wishlists w JOIN products p ON p.id = w.product_id WHERE w.user_id = ?`,
    [req.user.id]
  );
  return ok(res, { products });
}

async function toggleWishlist(req, res) {
  const { productId } = req.params;
  const [exists] = await pool.query('SELECT * FROM wishlists WHERE user_id=? AND product_id=?', [req.user.id, productId]);
  if (exists.length) {
    await pool.query('DELETE FROM wishlists WHERE user_id=? AND product_id=?', [req.user.id, productId]);
    return ok(res, { action: 'removed', count: 0 });
  }
  await pool.query('INSERT INTO wishlists (user_id, product_id) VALUES (?, ?)', [req.user.id, productId]);
  return ok(res, { action: 'added', count: 1 });
}

async function clearWishlist(req, res) {
  await pool.query('DELETE FROM wishlists WHERE user_id=?', [req.user.id]);
  return ok(res, { message: 'Wishlist cleared' });
}

module.exports = { getWishlist, toggleWishlist, clearWishlist };
