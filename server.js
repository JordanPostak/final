//This is the server.js

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
  res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// app.use(cors());
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

// Session middleware
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
      secure: true, // Ensure HTTPS is used
      sameSite: 'None' // Required for cross-site cookies
  }
}));

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