//...This is the routes/users.js file...

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const { isAuthenticated } = require('../middleware/authenticate');
const dynamicCors = require('../middleware/corsMiddleware');

// Retrieve all user profiles
router.get('/', usersController.getAllUsers);

// Retrieve user profile information by ID
router.get('/:id', usersController.getUserById);

// Create a new user profile
router.post('/register', usersController.registerUser);

// Login user
router.post('/login', usersController.loginUser);

// Update user profile information by user ID
router.put('/:id', usersController.updateUserById);

// Delete user profile by user ID
router.delete('/:id', usersController.deleteUserById);

// Logout user
router.post('/logout', usersController.logoutUser);

module.exports = router;