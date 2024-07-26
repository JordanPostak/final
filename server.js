//This is the server.js file...

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const cors = require('cors');
const { isAuthenticated, sessionMiddleware } = require('./middleware/authenticate');
const app = express();
const port = process.env.PORT || 3000;

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
    credentials: true,
}));

// Other middleware
app.use(bodyParser.json());

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