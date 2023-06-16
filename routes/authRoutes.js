const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('../controllers/authController');
const { body } = require('express-validator');

// Sign-up route
router.post('/signup', signUp);

// Sign-in route
router.post('/login', signIn);

module.exports = router;
