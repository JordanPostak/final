//...This is the routes/index.js file...

const router = require('express').Router();
const passport = require('passport');
const mongodb = require('../data/database');

router.use('/', require('./swagger'));
router.use('/users', require('./users'));
router.use('/inspirations', require('./inspirations'));
router.use('/journals', require('./journals'));
router.use('/plans', require('./plans'));

router.get('/login', passport.authenticate('github'), (req, res) => {
    console.log(req.session);
});

router.get('/logout', function(req, res, next) {
    console.log(req.session);
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;