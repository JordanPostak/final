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
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
});

// Configuration for routes that don't require credentials
const simpleCors = cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
});

module.exports = {
  loginCors,
  simpleCors
};