const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

// List of allowed origins
const allowedOrigins = [
    'http://localhost:5173', // Local development
    'http://seerstoneapi.onrender.com', // Your backend URL
    'https://seerstoneapi.onrender.com', // Your backend URL
    'https://jordanpostak.github.io', // GitHub Pages root URL
    'https://jordanpostak.github.io/inspire-stone' // GitHub Pages specific project URL
];

// Middleware for setting CORS headers dynamically
app.use((req, res, next) => {
    const origin = req.headers.origin;
    
    // Check if the origin is allowed
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    } else {
        res.setHeader('Access-Control-Allow-Origin', ''); // No access for unauthorized origins
    }

    // Allow specific methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // Allow specific headers
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    next();
});

// Other middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session setup with SameSite attribute
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'None', // Allow cross-site cookies
        httpOnly: true // Prevent access to cookie via JavaScript
    }
}));

// Routes
app.use("/", require("./routes/index.js"));

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