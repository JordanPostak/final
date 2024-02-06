//...This is the controllers/journals.js file...

const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getJournalEntryById = async (req, res) => {
    //#swagger.tags=['journals']
    const { id } = req.params;
    try {
        const journal = await mongodb.getDatabase().db('seerstone').collection('journals').findOne({ _id: ObjectId(id) });
        if (journal) {
            res.status(200).json(journal);
        } else {
            res.status(404).json({ error: 'Journal entry not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createJournalEntry = async (req, res) => {
    //#swagger.tags=['journals']
    const newJournal = req.body;
    try {
        const result = await mongodb.getDatabase().db('seerstone').collection('journals').insertOne(newJournal);
        res.status(201).json(result.ops[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateJournalEntryById = async (req, res) => {
    //#swagger.tags=['journals']
    const { id } = req.params;
    const updatedJournal = req.body;
    try {
        const result = await mongodb.getDatabase().db('seerstone').collection('journals').updateOne(
            { _id: ObjectId(id) },
            { $set: updatedJournal }
        );
        if (result.modifiedCount === 1) {
            res.status(200).json({ message: 'Journal entry updated successfully' });
        } else {
            res.status(404).json({ error: 'Journal entry not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteJournalEntryById = async (req, res) => {
    //#swagger.tags=['journals']
    const { id } = req.params;
    try {
        const result = await mongodb.getDatabase().db('seerstone').collection('journals').deleteOne({ _id: ObjectId(id) });
        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Journal entry deleted successfully' });
        } else {
            res.status(404).json({ error: 'Journal entry not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getJournalEntriesByUserId = async (req, res) => {
    //#swagger.tags=['journals']
    const { id } = req.params;
    try {
        const journals = await mongodb.getDatabase().db('seerstone').collection('journals').find({ user_id: id }).toArray();
        res.status(200).json(journals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getJournalEntriesByUserIdAndInspirationId = async (req, res) => {
    //#swagger.tags=['journals']
    const { id, inspirationId } = req.params;
    try {
        const journals = await mongodb.getDatabase().db('seerstone').collection('journals').find({ user_id: id, inspiration_id: inspirationId }).toArray();
        res.status(200).json(journals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getJournalEntryById,
    createJournalEntry,
    updateJournalEntryById,
    deleteJournalEntryById,
    getJournalEntriesByUserId,
    getJournalEntriesByUserIdAndInspirationId
};