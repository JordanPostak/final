// middleware/corsMiddleware.js

const cors = require('cors');

const allowedOrigins = [
  'http://localhost:5173',
  'http://seerstoneapi.onrender.com',
  'https://seerstoneapi.onrender.com',
  'https://jordanpostak.github.io',
  'https://jordanpostak.github.io/inspire-stone'
];

// Configuration for routes that require credentials
const loginCors = cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  credentials: true
});

// Configuration for routes that don't require credentials
const simpleCors = cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
});

module.exports = {
  loginCors,
  simpleCors
};