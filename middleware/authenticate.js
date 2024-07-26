//...This is the middleware/authenticate.js file...

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    // Set cookie options
    req.session.cookie.sameSite = 'None';
    req.session.cookie.secure = true;
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = {
    isAuthenticated
}