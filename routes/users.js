//...This is the routes/users.js file...


const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const { isAuthenticated } = require('../middleware/authenticate');
// const { loginCookie, loginCors, simpleCors } = require('../middleware/corsMiddleware');

// middleware
const cors = require('cors');

const allowedOrigins = [
  'http://localhost:5173',
  'http://seerstoneapi.onrender.com',
  'https://seerstoneapi.onrender.com',
  'https://jordanpostak.github.io',
  'https://jordanpostak.github.io/inspire-stone'
];

// Configuration for routes that require cookies
const loginCookie = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', req.headers.origin);
  res.set('Access-Control-Allow-Credentials', 'true');
  next();
};

// Configuration for routes that require credentials
const loginCors = cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  credentials: true
});

// Configuration for routes that don't require credentials
const simpleCors = cors({
  origin: allowedOrigins,
 });


// Retrieve all user profiles
router.get('/', simpleCors, usersController.getAllUsers);

// Retrieve user profile information by ID
router.get('/:id', simpleCors, usersController.getUserById);

// Create a new user profile
router.post('/register', simpleCors, usersController.registerUser);

// Login user
router.post('/login', loginCookie, loginCors, usersController.loginUser);

// Update user profile information by user ID
router.put('/:id', isAuthenticated, usersController.updateUserById);

// Delete user profile by user ID
router.delete('/:id', isAuthenticated, usersController.deleteUserById);

// Logout user
router.post('/logout', simpleCors, usersController.logoutUser);

module.exports = router;