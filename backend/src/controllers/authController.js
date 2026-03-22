const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const { ROLES } = require("../utils/roles");
const { ok, fail } = require("../utils/response");

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function mapUser(user) {
  return {
    _id: String(user.id),
    name: user.full_name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    city: user.city,
    address: user.address,
    avatar: user.avatar,
    createdAt: user.created_at,
    businessName: user.business_name,
    businessType: user.business_type,
    operatingHours: user.operating_hours,
    preferredContact: user.preferred_contact,
  };
}

async function register(req, res) {
  const {
    fullName, name, email, phone, password, confirmPassword, role,
    address, country, city, businessName, businessType, licenseNumber,
    operatingHours, preferredContact, termsAccepted,
  } = req.body;

  const finalName = fullName || name;
  if (!finalName || !email || !password || !role) {
    return fail(res, "Full name, email, password and role are required");
  }

  if (![ROLES.FARMER, ROLES.RESTAURANT, ROLES.INDUSTRIAL, ROLES.CUSTOMER].includes(role)) {
    return fail(res, "Invalid role");
  }

  if (confirmPassword && password !== confirmPassword) {
    return fail(res, "Passwords do not match");
  }

  const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
  if (!strong.test(password)) {
    return fail(res, "Password must be at least 8 chars and include uppercase, lowercase, number and special character");
  }

  if (!termsAccepted) {
    return fail(res, "You must accept terms and privacy policy");
  }

  const [exists] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
  if (exists.length) return fail(res, "Email already exists");

  const hashed = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    `INSERT INTO users
      (full_name, email, phone, password_hash, role, address, country, city, business_name, business_type, license_number, operating_hours, preferred_contact, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
    [
      finalName,
      email,
      phone || null,
      hashed,
      role,
      address || null,
      country || null,
      city || null,
      businessName || null,
      businessType || null,
      licenseNumber || null,
      operatingHours || null,
      preferredContact || null,
    ]
  );

  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [result.insertId]);
  const user = rows[0];

  return ok(
    res,
    {
      message: "Registration successful",
      token: signToken(user.id),
      user: mapUser(user),
    },
    201
  );
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return fail(res, "Email and password are required");
  }

  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  if (!rows.length) return fail(res, "Invalid credentials", 401);

  const user = rows[0];

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return fail(res, "Invalid credentials", 401);

  if (user.status !== "active") {
    return fail(res, "Account is inactive", 403);
  }

  return ok(res, {
    token: signToken(user.id),
    user: mapUser(user),
    message: `Login successful as ${user.role}`,
  });
}

async function me(req, res) {
  return ok(res, { user: mapUser(req.user) });
}

module.exports = { register, login, me, mapUser };