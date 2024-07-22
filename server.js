//...This is the server.js file...

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
    'http://localhost:5173',          // Local development
    'https://jordanpostak.github.io', // GitHub Pages URL
    'http://seerstoneapi.onrender.com', // Your backend URL
    'https://seerstoneapi.onrender.com' // Your backend URL
];

// Middleware
app
    .use(bodyParser.json())
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, sameSite: 'lax' } // Adjust cookie settings as needed
    }))
    .use(cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
        credentials: true
    }))
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', req.headers.origin); // Reflect the request origin
        res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
        } else {
            next();
        }
    })
    .use("/", require("./routes/index.js"));

// Routes
app.get('/', (req, res) => {
    if (req.session.user) {
        const { user_id, username } = req.session.user;
        const inspiration = req.session.inspiration;

        res.send(`
            <h1>Logged in as ${username}</h1>
            <h2>User id: ${user_id}</h2>
            ${inspiration ? `<h3>Currently viewing inspiration ID: ${inspiration._id}</h3>` : '<h3>Not viewing any inspiration</h3>'}
            <h2><a href="https://seerstoneapi.onrender.com/api-docs">Click here to go to Swagger</a></h2>
        `);
    } else {
        res.send(`
            <h1>Logged Out</h1>
            <h2><a href="https://seerstoneapi.onrender.com/api-docs">Click here to go to Swagger and register or login</a></h2>
        `);
    }
});

// Initialize MongoDB connection
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            if (process.env.NODE_ENV !== 'test') {
                console.log(`Connected to DB and listening on ${port}`);
            }
        });
    }
});

module.exports = app;