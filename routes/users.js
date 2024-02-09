//...This is the routes/users.js file...

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const { isAuthenticated } = require('../middleware/authenticate');

// Retrieve all  user profiles
router.get('/', usersController.getAllUsers);

// Retrieve user profile information by ID
router.get('/:id', usersController.getUserById);

// Create a new user profile
router.post('/', isAuthenticated, usersController.createUser);

// Update user profile information by user ID
router.put('/:id', isAuthenticated, usersController.updateUserById);

// Delete user profile by user ID
router.delete('/:id', isAuthenticated, usersController.deleteUserById);

module.exports = router;