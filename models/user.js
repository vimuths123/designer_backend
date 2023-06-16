const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = require('../config/dbConfig');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'name field is required.',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: 'email field is required.',
      },
      isEmail: {
        msg: 'Invalid email address.',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'password field is required.',
      },
    },
  },
}, {
  tableName: 'users', // Specify the table name explicitly
});

// Hash the password before saving the user
User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

module.exports = User;
