//...This is the routes/users.js file...

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const isAuthenticated = require('../middleware/authenticate');
const cors = require('cors');

// Retrieve all user profiles
router.get('/', usersController.getAllUsers);
// Retrieve user profile information by ID
router.get('/:id', usersController.getUserById);
// Create a new user profile
router.post('/register', usersController.registerUser);
// Login user
router.post('/login', corsMiddleware, usersController.loginUser);
// Update user profile information by user ID
router.put('/:id', isAuthenticated, usersController.updateUserById);
// Delete user profile by user ID
router.delete('/:id', isAuthenticated, usersController.deleteUserById);
// Logout user
router.post('/logout', usersController.logoutUser);

module.exports = router;



const corsMiddleware = cors({
  origin: [
    'http://localhost:5173',          // Local development
    'http://seerstoneapi.onrender.com', // Your backend URL
    'https://seerstoneapi.onrender.com', // Your backend URL
    'https://jordanpostak.github.io',             // GitHub Pages root URL
    'https://jordanpostak.github.io/inspire-stone' // GitHub Pages specific project URL
  ],
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  credentials: true,
  maxAge: 600
});