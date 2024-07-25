//This is the server.js file...

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware for setting CORS headers dynamically
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', req.headers.origin);
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Set-Cookie');
    next();
});

// CORS setup using the `cors` package
app.use(cors({
    origin: [
        'http://localhost:5173',          // Local development
        'http://seerstoneapi.onrender.com', // Your backend URL
        'https://seerstoneapi.onrender.com', // Your backend URL
        'https://jordanpostak.github.io',             // GitHub Pages root URL
        'https://jordanpostak.github.io/inspire-stone' // GitHub Pages specific project URL
    ],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    credentials: true
}));

// Other middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set dynamic cookie options based on environment and request
const setCookieOptions = (req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        req.session.cookie.sameSite = 'None';
        req.session.cookie.secure = true;
    } else {
        req.session.cookie.sameSite = 'Lax';
        req.session.cookie.secure = false;
    }
    next();
};

app.use(setCookieOptions);

// Session middleware
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));

// Routes
const { isAuthenticated } = require('./middleware/authenticate');

app.use("/", require("./routes/index.js"));

app.get('/inspirations', isAuthenticated, async (req, res) => {
    try {
        // Fetch inspirations from your database
        const inspirations = await getInspirationsFromDB();
        res.json(inspirations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inspirations' });
    }
});

// Example route for testing session
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