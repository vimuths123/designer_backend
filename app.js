const express = require('express');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3001;


// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);

// Routes
app.use('/auth', authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
