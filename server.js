//...This is the server.js file...

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    }))
    // This is the basic express session({..}) initialization.
    .use(passport.initialize())
    // init passport on every route call.
    .use(passport.session())
    // allow passport to use "express-session".
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
        );
        res.setHeader(
            'Access-Control-Allow-Methods', 
            'POST, GET, PUT, PATCH, OPTIONS, DELETE'
        );
        next();
    })
    .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
    .use(cors({ origin: ['http://localhost:3000', 'http://seerstoneapi.onrender.com', 'https://seerstoneapi.onrender.com'], credentials: true }))
    .use("/", require("./routes/index.js"));

    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        //User.findOrCreate({ githubId: profile.id }, function (err, user) {
            return done(null, profile);
        //})
    }
    ));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => {

    if (req.session.user !== undefined) {
        const userid = req.session.user.id;
        const displayName = req.session.user.displayName;
        const profilePicture = req.session.user.photos[0].value;
        res.send(`
            <h1>Logged in as ${displayName}</h1>
            <h2>Use this to represent your user_id for collection fields in swagger: ${userid}</h2>
            <h2><a href="http://localhost:3000/api-docs">Click here to go to Swagger</a></h2>
            <img src="${profilePicture}" alt="Profile Picture">
        `);
    } else {
        res.send(`
        <h1>Logged Out</h1>
    `);
    }
});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            if (process.env.NODE_ENV !== 'test') {
                console.log(`Database is listening and node Running on port ${port}`);
            }
        });
    }
});

module.exports = app;