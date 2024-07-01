//...This is the server.js file...

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const usersController = require('./controllers/users'); // Import users controller

const app = express();

const port = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    }))
    .use(passport.initialize())
    .use(passport.session())
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
    async function(accessToken, refreshToken, profile, done) {
        try {
            const db = mongodb.getDatabase().db('seerstone');
            const usersCollection = db.collection('users');
            const user = await usersCollection.findOne({ user_id: profile.id });

            if (!user) {
                // Create a new user if one doesn't exist
                const newUser = {
                    user_id: profile.id,
                    username: profile.username,
                    password: '', // Set to an empty string as the password is managed by GitHub
                    first_name: profile.displayName || '',
                    last_name: '',
                    email: (profile.emails && profile.emails[0].value) || ''
                };
                await usersCollection.insertOne(newUser);
                return done(null, newUser);
            } else {
                return done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const db = mongodb.getDatabase().db('seerstone');
        const user = await db.collection('users').findOne({ _id: new mongodb.ObjectId(id) });
        done(null, user);
    } catch (error) {
        done(error);
    }
});

app.get('/', (req, res) => {
    if (req.session.user !== undefined) {
        const userid = req.session.user.user_id;
        const displayName = req.session.user.username;
        res.send(`
            <h1>Logged in as ${displayName}</h1>
            <h2>Use this to represent your user_id for collection fields in swagger: ${userid}</h2>
            <h2><a href="https://seerstoneapi.onrender.com/api-docs">Click here to go to Swagger</a></h2>
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