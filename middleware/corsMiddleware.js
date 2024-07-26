// middleware/corsMiddleware.js
const cors = require('cors');

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

module.exports = corsMiddleware;