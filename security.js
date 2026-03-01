const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET = 'ASTRA_SUPER_SECRET_KEY';

module.exports = {
  generateToken: (user) => {
    return jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: '7d' });
  },

  authMiddleware: async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token' });

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, SECRET);
      const user = await User.findById(decoded.id);
      if (!user) return res.status(401).json({ error: 'User not found' });

      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }
};