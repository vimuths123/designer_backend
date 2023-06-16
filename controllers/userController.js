const User = require('../models/user');



// Controller function to create a new user
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        res.status(201).json({ success: true, data: user });
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

// Controller function to get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    createUser,
    getUsers,
};
