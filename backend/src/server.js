const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

dotenv.config();
const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS not allowed for origin: ${origin}`));
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/', (_req, res) => {
  res.send('Farmlink backend is running');
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Farmlink API running' });
});

app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }), require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));
app.use('/api/farmers', require('./routes/farmerRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/chatbot', require('./routes/chatbotRoutes'));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5001;
console.log('CLIENT_URL =', process.env.CLIENT_URL);
console.log('JWT_SECRET =', process.env.JWT_SECRET);
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
console.log("GEMINI_API_KEY =", process.env.GEMINI_API_KEY);