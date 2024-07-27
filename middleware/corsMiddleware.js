// middleware/corsMiddleware.js
const loginCors = (req, res, next) => {
  const allowedOrigins = [
      'http://localhost:5173',
      'http://seerstoneapi.onrender.com',
      'https://seerstoneapi.onrender.com',
      'https://jordanpostak.github.io',
      'https://jordanpostak.github.io/inspire-stone'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, UPDATE, PUT, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
};


const simpleCors = (req, res, next) => {
  const allowedOrigins = [
    'http://localhost:5173',
    'http://seerstoneapi.onrender.com',
    'https://seerstoneapi.onrender.com',
    'https://jordanpostak.github.io',
    'https://jordanpostak.github.io/inspire-stone'
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, UPDATE, PUT, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
};

module.exports = {
  loginCors,
  simpleCors
};