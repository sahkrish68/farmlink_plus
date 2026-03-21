const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// public routes
router.get("/:slug", getProduct);

// mixed route: public for marketplace, protected when mine=true
router.get("/", (req, res, next) => {
  if (req.query.mine === "true") {
    return auth(req, res, next);
  }
  next();
}, listProducts);

// protected seller routes
router.post("/", auth, upload.single("image"), createProduct);
router.put("/:id", auth, upload.single("image"), updateProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;