const pool = require("../config/db");
const { ok, fail } = require("../utils/response");
const { SELLER_ROLES } = require("../utils/roles");

function buildImagePath(req) {
  if (req.file) {
    return `/uploads/${req.file.filename}`;
  }

  if (req.body.imageUrl && req.body.imageUrl.trim()) {
    return req.body.imageUrl.trim();
  }

  return null;
}

async function listProducts(req, res) {
  try {
    const mine = req.query.mine === "true";

    let query = `
      SELECT p.*, u.full_name AS seller_name, u.role AS seller_role
      FROM products p
      JOIN users u ON u.id = p.seller_id
    `;
    const params = [];

    if (mine) {
      if (!req.user) return fail(res, "Unauthorized", 401);
      query += ` WHERE p.seller_id = ? ORDER BY p.created_at DESC`;
      params.push(req.user.id);
    } else {
      query += ` WHERE p.is_active = 1 ORDER BY p.created_at DESC`;
    }

    const [products] = await pool.query(query, params);
    return ok(res, { products, total: products.length, pages: 1 });
  } catch (error) {
    return fail(res, error.message || "Failed to load products", 500);
  }
}

async function getProduct(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT p.*, u.full_name AS seller_name, u.role AS seller_role
       FROM products p
       JOIN users u ON u.id = p.seller_id
       WHERE p.slug = ? LIMIT 1`,
      [req.params.slug]
    );

    if (!rows.length) return fail(res, "Product not found", 404);

    return ok(res, { product: rows[0] });
  } catch (error) {
    return fail(res, error.message || "Failed to get product", 500);
  }
}

async function createProduct(req, res) {
  try {
    if (!SELLER_ROLES.includes(req.user.role)) {
      return fail(res, "Only sellers can add products", 403);
    }

    const {
      name,
      slug,
      category,
      productType,
      description,
      quantityAvailable,
      unit,
      price,
      minOrderQuantity,
      stockStatus,
      deliveryOption,
      deliveryArea,
      expiryDate,
      city,
    } = req.body;

    if (!name || !slug || !category || !quantityAvailable || !unit || !price) {
      return fail(res, "Required product fields are missing", 400);
    }

    const image = buildImagePath(req);

    const [result] = await pool.query(
      `INSERT INTO products
      (seller_id, name, slug, category, product_type, description, image, available_quantity, unit, price, min_order_quantity, stock_status, delivery_option, delivery_area, expiry_date, city, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [
        req.user.id,
        name,
        slug,
        category,
        productType || null,
        description || null,
        image,
        Number(quantityAvailable),
        unit,
        Number(price),
        minOrderQuantity ? Number(minOrderQuantity) : 1,
        stockStatus || "in_stock",
        deliveryOption || null,
        deliveryArea || null,
        expiryDate || null,
        city || null,
      ]
    );

    const [rows] = await pool.query(`SELECT * FROM products WHERE id = ?`, [result.insertId]);

    return ok(res, { message: "Product added successfully", product: rows[0] }, 201);
  } catch (error) {
    return fail(res, error.message || "Failed to create product", 500);
  }
}

async function updateProduct(req, res) {
  try {
    const [existingRows] = await pool.query(
      `SELECT * FROM products WHERE id = ? AND seller_id = ?`,
      [req.params.id, req.user.id]
    );

    if (!existingRows.length) return fail(res, "Product not found", 404);

    const existing = existingRows[0];

    const {
      name,
      slug,
      category,
      productType,
      description,
      quantityAvailable,
      unit,
      price,
      minOrderQuantity,
      stockStatus,
      deliveryOption,
      deliveryArea,
      expiryDate,
      city,
      imageUrl,
    } = req.body;

    let image = existing.image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else if (imageUrl && imageUrl.trim()) {
      image = imageUrl.trim();
    }

    await pool.query(
      `UPDATE products
       SET name = ?, slug = ?, category = ?, product_type = ?, description = ?, image = ?, available_quantity = ?, unit = ?, price = ?, min_order_quantity = ?, stock_status = ?, delivery_option = ?, delivery_area = ?, expiry_date = ?, city = ?
       WHERE id = ? AND seller_id = ?`,
      [
        name || existing.name,
        slug || existing.slug,
        category || existing.category,
        productType || existing.product_type,
        description || existing.description,
        image,
        quantityAvailable ? Number(quantityAvailable) : existing.available_quantity,
        unit || existing.unit,
        price ? Number(price) : existing.price,
        minOrderQuantity ? Number(minOrderQuantity) : existing.min_order_quantity,
        stockStatus || existing.stock_status,
        deliveryOption || existing.delivery_option,
        deliveryArea || existing.delivery_area,
        expiryDate || existing.expiry_date,
        city || existing.city,
        req.params.id,
        req.user.id,
      ]
    );

    return ok(res, { message: "Product updated successfully" });
  } catch (error) {
    return fail(res, error.message || "Failed to update product", 500);
  }
}

async function deleteProduct(req, res) {
  try {
    const [result] = await pool.query(
      `DELETE FROM products WHERE id = ? AND seller_id = ?`,
      [req.params.id, req.user.id]
    );

    if (!result.affectedRows) return fail(res, "Product not found", 404);

    return ok(res, { message: "Product deleted successfully" });
  } catch (error) {
    return fail(res, error.message || "Failed to delete product", 500);
  }
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};