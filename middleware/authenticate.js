//...This is the middleware/authenticate.js file...

const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
      return next();
    }
    res.status(401).send('Unauthorized');
  };

module.exports = {
    isAuthenticated
}