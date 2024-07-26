//...This is the middleware/authenticate.js file...

const session = require('express-session');

// Session middleware to be used only for login
const sessionMiddleware = session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
});

// Middleware to set session cookie options for authenticated routes
const setSessionCookieOptions = (req, res, next) => {
    req.session.cookie.sameSite = 'None';
    req.session.cookie.secure = true;
    next();
};

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        setSessionCookieOptions(req, res, next);
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = {
    isAuthenticated,
    sessionMiddleware
};