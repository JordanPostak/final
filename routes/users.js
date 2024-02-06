//...This is the routes/users.js file...

const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const { isAuthenticated } = require('../middleware/authenticate');

// GET all users
router.get('/', usersController.getAllUsers);

// GET a single user by ID
router.get('/:id', usersController.getSingleUser);

// POST a new user
router.post('/', isAuthenticated, usersController.createUser);

// PUT (update) a user by ID
router.put('/:id', isAuthenticated, usersController.updateUser);

// DELETE a user by ID
router.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = router;