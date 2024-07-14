//...This is the routes/index.js file...

const router = require('express').Router();
const passport = require('passport');
const mongodb = require('../data/database');

router.use('/', require('./swagger'));
router.use('/users', require('./users'));
router.use('/inspirations', require('./inspirations'));
router.use('/journals', require('./journals'));
router.use('/plans', require('./plans'));
router.use('/quotes', require('./quotes'));

// Conditionally handle login based on environment
if (process.env.NODE_ENV !== 'test') {
    router.get('/login', passport.authenticate('github', { session: false }), (req, res) => {
        console.log(req.session);
        res.redirect('/');
    });
} else {
    // In the test environment, create a dummy login route
    router.get('/login', (req, res) => {
        // Simulate login behavior for testing purposes
        res.send('Logged in successfully for testing.');
    });
}

// Conditionally handle logout based on environment
if (process.env.NODE_ENV !== 'test') {
    router.get('/logout', function(req, res, next) {
        console.log(req.session);
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    });
} else {
    // In the test environment, create a dummy logout route
    router.get('/logout', (req, res) => {
        // Simulate logout behavior for testing purposes
        res.send('Logged out successfully for testing.');
    });
}

module.exports = router;