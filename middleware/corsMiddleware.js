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
const loginCors = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin) || !origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, UPDATE, PUT, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(204); // No Content
  } else {
    next();
  }
};

// Configuration for routes that don't require credentials
const simpleCors = cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
});

module.exports = {
  loginCors,
  simpleCors
};