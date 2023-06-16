const express = require('express');
const router = express.Router();
const { createUser, getUsers } = require('../controllers/userController');

// Route for creating a new user
router.post('/', createUser);

// Route for getting all users
router.get('/', getUsers);


module.exports = router;
