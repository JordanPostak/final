//...This is the server.js file...

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app
    .use(bodyParser.json())
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    }))
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, OPTIONS, DELETE');
        next();
    })
    .use(cors({
        origin: ['http://localhost:5173', 'http://seerstoneapi.onrender.com', 'https://seerstoneapi.onrender.com'],
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
        credentials: true
    }))
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