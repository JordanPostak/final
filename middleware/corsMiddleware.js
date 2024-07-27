// middleware/corsMiddleware.js
const cors = require('cors');


// middleware/dynamicCorsMiddleware.js
const dynamicCors = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', req.headers.origin);
  res.set('Access-Control-Allow-Credentials', 'true');
  next();
};

module.exports = dynamicCors;