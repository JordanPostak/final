//...This is the controllers/quotes.js file...

const ObjectId = require('mongodb').ObjectId;
const mongodb = require('../data/database');

const getAllQuotes = async (req, res) => {
    // #swagger.tags=['quotes']
    try {
        const result = await mongodb.getDatabase().db('seerstone').collection('quotes').find();
        result.toArray().then((quotes) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(quotes);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllQuotes,
    
};