const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { authMiddleware } = require('./core/security');

// API routes
const authRoutes = require('./api/auth');
const plansRoutes = require('./api/plans');
const botsRoutes = require('./api/bots');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to DB
connectDB();

// Public routes
app.use('/auth', authRoutes);

// Protected routes
app.use('/plans', authMiddleware, plansRoutes);
app.use('/bots', authMiddleware, botsRoutes);

// Start server
app.listen(8080, () => {
  console.log('🚀 Astra Hosting API running on port 8080');
});