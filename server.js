//...This is the server.js file...

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport'); // Remove GitHubStrategy import
const cors = require('cors');
const usersRouter = require('./routes/users');
const { hashPassword } = require('./utils/passwordUtils'); // Import your password hashing function

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
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, OPTIONS, DELETE');
        next();
    })
    .use(cors({
        origin: ['http://localhost:3000', 'http://seerstoneapi.onrender.com', 'https://seerstoneapi.onrender.com'],
        credentials: true
    }))
    .use("/", require("./routes/index.js")); // Assuming index.js routes to other endpoints