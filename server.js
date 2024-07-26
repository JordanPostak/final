//This is the server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

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
  maxAge: 600
}));

app.use(bodyParser.json({ limit: "25mb" }));

// Session middleware
// app.use(session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: true,
// }));

// Routes
app.use("/", require("./routes/index.js"));

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