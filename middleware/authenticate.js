//...This is the middleware/authenticate.js file...

const session = require('express-session');

// Session middleware to be used only for login
const sessionMiddleware = session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: 'None',
        secure: process.env.NODE_ENV === 'production'
    }
});



// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        req.session.cookie.sameSite = 'None';
        req.session.cookie.secure = true;
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = {
    isAuthenticated,
    sessionMiddleware
};