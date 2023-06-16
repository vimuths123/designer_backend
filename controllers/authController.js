const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/user');
require('dotenv').config();

// Sign-up controller
const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Email address is already registered.' });
    }
    const user = await User.create({ name, email, password });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });

    const userData = {
      name: user.name,
      email: user.email,
    };


    res.status(201).json({ success: true, data: { user: userData, token } });
  } catch (error) {
    let errorMessage = '';
    if (error.name === 'SequelizeValidationError') {
      errorMessage = error.errors.map((err) => err.message).join(', ');
    } else {
      errorMessage = error.message;
    }
    res.status(500).json({ success: false, error: errorMessage });
  }
};

// Sign-in controller
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;


    const errors = [];

    if (!email) {
      errors.push('No email found');
    }

    // Check if the email is valid
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (email && !emailRegex.test(email)) {
      errors.push('Invalid email address');
    }

    if (!password) {
      errors.push('No password found');
    }

    if (errors.length > 0) {
      return res.status(401).json({ success: false, errors });
    }

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ success: false, error: 'No user with email' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, error: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });

    const userData = {
      name: user.name,
      email: user.email,
    };


    res.status(200).json({ success: true, data: { user: userData, token } });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
};
