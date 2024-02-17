//...This is the controllers/journals.js file...

const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getAllJournalEntries= async (req, res) => {
    //#swagger.tags=['journals']
    try {
        const result = await mongodb.getDatabase().db('seerstone').collection('journals').find();
        result.toArray().then((journals) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(journals);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getJournalEntryById = async (req, res) => {
    //#swagger.tags=['journals']
    const journalId = req.params.id;
    if (!ObjectId.isValid(journalId)) {
        return res.status(400).json({ error: 'Invalid journal ID' });
    }

    try {
        const cursor = await mongodb.getDatabase().db('seerstone').collection('journals').find({ _id: new ObjectId(journalId) });

        cursor.toArray().then((journals) => {

            if (journals.length === 0) {
                return res.status(404).json({ error: 'Journal not found' });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(journals[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createJournalEntry = async (req, res) => {
    //#swagger.tags=['journals']
    const { 
        user_id, 
        date, 
        entry, 
        inspiration_id 
    } = req.body;

    // Data validation
    if (!user_id || !date || !entry || !inspiration_id) {
        return res.status(400).json({ error: "user_id, date, entry and inspiration_id are required fields." });
    }

    // Create the new journal object

    const newJournal = {
        user_id,
        date,
        entry,
        inspiration_id
    };
    
    try {
        const response = await mongodb.getDatabase().db('seerstone')
            .collection('journals')
            .insertOne(newJournal);

        // Check if the journal was successfully updated
        if (response.acknowledged) {
            return res.status(201).json({ message: 'Journal successfully created', journal: newJournal });// Successfully created
        } else {
            return res.status(500).json('Some error occurred while creating the journal.');// Internal server error
        }
    } catch (error) {
        return res.status(500).json(error.message || 'Some error occurred while creating the journal.');// Internal server error
    }
};

const updateJournalEntryById = async (req, res) => {
    //#swagger.tags=['journals']
    const journalId = new ObjectId(req.params.id);
    const {
        user_id,
        date,
        entry,
        inspiration_id
    } = req.body;

    // Data validation
    if (!user_id || !date || !entry || !inspiration_id) {
        return res.status(400).json({ error: "user_id, date, entry and inspiration_id are required fields." });
    }

    const updatedJournal = {
        user_id,
        date,
        entry,
        inspiration_id
    };

    try {
        // Update the journal entry in the database
        const response = await mongodb.getDatabase().db('seerstone').collection('journals').replaceOne({ _id: journalId }, updatedJournal);

        // Check if the journal entry was successfully updated
        if (response.modifiedCount > 0) {
            return res.status(200).json({ message: 'Journal successfully updated', journal: updatedJournal}); // Successfully updated
        } else {
            return res.status(404).json({ error: "Journal not found." }); // Journal with given ID not found
        }
    } catch (error) {
        return res.status(500).json(error.message || 'Some error occurred while updating the journal.'); // Internal server error
    }
};

const deleteJournalEntryById = async (req, res) => {
    //#swagger.tags=['journals']
    try {
        const journalId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db('seerstone').collection('journals').deleteOne({ _id: journalId });
        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Journal successfully deleted'});
        } else {
            res.status(404).json(response.error || 'Some error occurred while deleting the journal.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getJournalEntriesByUserId = async (req, res) => {
    //#swagger.tags=['journals']
    const { user_id } = req.params; // Access user_id from route parameters
    
    if (!user_id) {
        return res.status(400).json({ error: 'user_id is required' });
    }
    
    try {
        const journals = await mongodb.getDatabase()
            .db('seerstone')
            .collection('journals')
            .find({ user_id: user_id })
            .toArray();

        if (journals.length === 0) {
            return res.status(404).json({ error: 'No journals found for the provided user_id' });
        }

        res.status(200).json(journals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getJournalEntriesByUserIdAndInspirationId = async (req, res) => {
    //#swagger.tags=['journals']
    const { user_id, inspiration_id } = req.params; // Use req.params to access route parameters
    if (!user_id || !inspiration_id) {
        return res.status(400).json({ error: 'user_id and inspiration_id are required' });
    }
    try {
        const journals = await mongodb.getDatabase().db('seerstone').collection('journals').find({ user_id, inspiration_id }).toArray();
        res.status(200).json(journals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllJournalEntries,
    getJournalEntryById,
    createJournalEntry,
    updateJournalEntryById,
    deleteJournalEntryById,
    getJournalEntriesByUserId,
    getJournalEntriesByUserIdAndInspirationId
};