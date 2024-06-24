//...This is the server.js file...

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const mongodb = require('./data/database');
const { ObjectId } = require('mongodb');
const { isAuthenticated } = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app
    .use(bodyParser.json())
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(cors({
        origin: ['http://localhost:3000', 'http://seerstoneapi.onrender.com', 'https://seerstoneapi.onrender.com'],
        credentials: true
    }))
    .use("/", require("./routes/index.js"));

// MongoDB connection
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('MongoDB connected');
});

// Passport GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    // Check if user exists in MongoDB
    mongodb.getDatabase().db('seerstone').collection('users').findOne({ githubId: profile.id }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
            // Create new user if not found
            const newUser = {
                githubId: profile.id,
                username: profile.username,
                displayName: profile.displayName,
                profilePicture: profile.photos[0].value // Assuming profile picture is the first photo
            };
            mongodb.getDatabase().db('seerstone').collection('users').insertOne(newUser, (err, result) => {
                if (err) { return done(err); }
                return done(null, newUser);
            });
        } else {
            // Return existing user
            return done(null, user);
        }
    });
}));

// Serialize and Deserialize user
passport.serializeUser((user, done) => {
    done(null, user._id); // Store only the user ID in session
});

passport.deserializeUser((id, done) => {
    mongodb.getDatabase().db('seerstone').collection('users').findOne({ _id: new ObjectId(id) }, (err, user) => {
        done(err, user);
    });
});

// Routes
app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const userid = req.user._id; // Assuming _id is stored in MongoDB
        const displayName = req.user.displayName;
        const profilePicture = req.user.profilePicture;
        res.send(`
            <h1>Logged in as ${displayName}</h1>
            <h2>User ID for collection fields in Swagger: ${userid}</h2>
            <h2><a href="https://seerstoneapi.onrender.com/api-docs">Click here to go to Swagger</a></h2>
            <img src="${profilePicture}" alt="Profile Picture">
        `);
    } else {
        res.send(`
            <h1>Logged Out</h1>
        `);
    }
});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false
}), (req, res) => {
    // Successful authentication, redirect home
    res.redirect('/');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;