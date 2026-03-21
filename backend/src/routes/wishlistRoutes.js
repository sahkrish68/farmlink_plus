const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { getWishlist, toggleWishlist, clearWishlist } = require('../controllers/wishlistController');
router.use(auth);
router.get('/', getWishlist);
router.post('/:productId', toggleWishlist);
router.delete('/', clearWishlist);
module.exports = router;
