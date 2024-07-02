//...This is the server.js file...

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }))
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, OPTIONS, DELETE');
        next();
    })
    .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
    .use(cors({ origin: ['http://localhost:3000', 'http://seerstoneapi.onrender.com', 'https://seerstoneapi.onrender.com'], credentials: true }))
    .use("/", require("./routes/index.js"));

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