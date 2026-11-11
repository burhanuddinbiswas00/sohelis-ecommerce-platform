const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { memoryUsers } = require('../config/memoryStore');

let inMemUsers = [...memoryUsers];

const isConnected = () => mongoose.connection.readyState === 1;

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'soheli_super_secret_jwt_key_2026_nakshi_kantha',
    {
      expiresIn: '30d',
    }
  );
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide email and password');
    }

    if (isConnected()) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user && (await user.matchPassword(password))) {
        return res.json({
          success: true,
          message: 'Login successful',
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role),
          },
        });
      } else {
        res.status(401);
        throw new Error('Invalid email or password');
      }
    }

    // In-memory fallback
    const user = inMemUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user && (await user.matchPassword(password))) {
      return res.json({
        success: true,
        message: 'Login successful',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id, user.role),
        },
      });
    }

    res.status(401);
    throw new Error('Invalid email or password');
  } catch (error) {
    next(error);
  }
};

// @desc    Register a new user / admin
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please provide name, email, and password');
    }

    if (isConnected()) {
      const userExists = await User.findOne({ email: email.toLowerCase() });
      if (userExists) {
        res.status(400);
        throw new Error('User already exists with this email');
      }

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        role: role || 'customer',
      });

      return res.status(201).json({
        success: true,
        message: 'Registration successful',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id, user.role),
        },
      });
    }

    // In-memory fallback
    const exists = inMemUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      res.status(400);
      throw new Error('User already exists with this email');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      _id: '6618f0a0000000000000' + String(Date.now()).slice(-4),
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'customer',
      createdAt: new Date(),
      updatedAt: new Date(),
      async matchPassword(entered) {
        return await bcrypt.compare(entered, this.password);
      },
    };

    inMemUsers.push(newUser);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        token: generateToken(newUser._id, newUser.role),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
  getMe,
  inMemUsers,
};
