const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { inMemUsers } = require('../controllers/authController');

const isConnected = () => mongoose.connection.readyState === 1;

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'soheli_super_secret_jwt_key_2026_nakshi_kantha'
      );

      if (isConnected()) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        const found = inMemUsers.find((u) => String(u._id) === String(decoded.id));
        if (found) {
          const { password, ...rest } = found;
          req.user = rest;
        }
      }

      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }
      return next();
    } catch (error) {
      console.error('Auth verification error:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin };
