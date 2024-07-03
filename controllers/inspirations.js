//...This is the controllers/inspirations.js file...

const ObjectId = require('mongodb').ObjectId;
const mongodb = require('../data/database');

const getAllInspirations = async (req, res) => {
    // #swagger.tags=['inspirations']
    try {
        const result = await mongodb.getDatabase().db('seerstone').collection('inspirations').find();
        result.toArray().then((inspirations) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(inspirations);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSingleInspiration = async (req, res) => {
    // #swagger.tags=['inspirations']
    const inspirationId = req.params.id;

    try {
        const inspiration = await mongodb.getDatabase().db('seerstone').collection('inspirations').findOne({ inspirationId });

        if (!inspiration) {
            return res.status(404).json({ error: 'Inspiration not found.' });
        }
    
        // Set user session
        req.session.inspiration = inspiration;

        res.status(200).json({ message: 'viewing inspiration.', inspiration });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to view inspiration.' });
    }
};

  const createInspiration = async (req, res) => {
    // #swagger.tags=['inspirations']
    const userId = req.session.user.user_id;
    const {
        type,
        step,
        parent_id,
        child_id,
        evidence,
        acted_on,
        planned,
        reviewed,
        recorded
    } = req.body;

    // Data validation
    if (!type || !step|| !parent_id|| !child_id|| !evidence|| !acted_on|| !planned|| !reviewed|| !recorded) {
        return res.status(400).json({ error: "type, step, parent_id, child_id, evidence, acted_on, planned, reviewed and recorded are required fields." });
    }

    // Create the new inspiration object
    const newInspiration = {
        user_id: userId,
        type,
        step,
        parent_id,
        child_id,
        evidence,
        acted_on,
        planned,
        reviewed,
        recorded
    };

    try {
        const response = await mongodb.getDatabase().db('seerstone')
            .collection('inspirations')
            .insertOne(newInspiration);

        // Check if the inspiration was successfully updated
        if (response.acknowledged) {
            return res.status(201).json({ message: 'Inspiration successfully created', inspiration: newInspiration });// Successfully created
        } else {
            return res.status(500).json('Some error occurred while creating the inspiration.');// Internal server error
        }
    } catch (error) {
        return res.status(500).json(error.message || 'Some error occurred while creating the inspiration.');// Internal server error
    }
};

const updateInspiration = async (req, res) => {
    // #swagger.tags=['inspirations']
    const userId = req.session.user.user_id;
    const inspirationId = req.session.inspirationId;
    const {
        type,
        step,
        parent_id,
        child_id,
        evidence,
        acted_on,
        planned,
        reviewed,
        recorded
    } = req.body;

    // Data validation
    if (!type || !step|| !parent_id|| !child_id|| !evidence|| !acted_on|| !planned|| !reviewed|| !recorded) {
        return res.status(400).json({ error: "user_id, type, step, parent_id, child_id, evidence, acted_on, planned, reviewed and recorded are required fields." });
    }

    const updatedInspiration = {
        user_id: userId,
        type,
        step,
        parent_id,
        child_id,
        evidence,
        acted_on,
        planned,
        reviewed,
        recorded
    };

    try {
        // Update the inspiration in the database
        const response = await mongodb.getDatabase().db('seerstone').collection('inspirations').replaceOne({ _id: inspirationId }, updatedInspiration);

        // Check if the inspiration was successfully updated
        if (response.modifiedCount > 0) {
            return res.status(200).json({ message: 'Inspiration successfully updated', inspiration: updatedInspiration}); // Successfully updated
        } else {
            return res.status(404).json({ error: "Inspiration not found." }); // Inspiration with given ID not found
        }
    } catch (error) {
        return res.status(500).json(error.message || 'Some error occurred while updating the inspiration.'); // Internal server error
    }
};

const deleteInspiration = async (req, res) => {
    // #swagger.tags=['inspirations']
    try {
        const inspirationId = req.session.inspirationId;
        const response = await mongodb.getDatabase().db('seerstone').collection('inspirations').deleteOne({ _id: inspirationId });
        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Inspiration successfully deleted'});
        } else {
            res.status(404).json(response.error || 'Some error occurred while deleting the inspiration.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getInspirationsByUserId = async (req, res) => {
    // #swagger.tags=['inspirations']
    const userId = req.session.user.user_id;
    
    if (!userId) {
        return res.status(400).json({ error: 'user_id is required' });
    }
    
    try {
        const inspirations = await mongodb.getDatabase()
            .db('seerstone')
            .collection('inspirations')
            .find({ user_id: userId })
            .toArray();

        if (inspirations.length === 0) {
            return res.status(404).json({ error: 'No inspirations found for the provided user_id' });
        }

        res.status(200).json(inspirations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getInspirationsByUserIdAndType = async (req, res) => {
    // #swagger.tags=['inspirations']
    const userId = req.session.user.user_id;
    const { type } = req.params; // Use req.params to access route parameters
    if (!type) {
        return res.status(400).json({ error: 'type is required' });
    }
    try {
        const inspirations = await mongodb.getDatabase().db('seerstone').collection('inspirations').find({ userId, type }).toArray();
        res.status(200).json(inspirations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getInspirationsByUserIdAndStep = async (req, res) => {
    // #swagger.tags=['inspirations']
    const userId = req.session.user.user_id;
    const { step } = req.params; // Use req.params to access route parameters
    if (!step) {
        return res.status(400).json({ error: 'step is required' });
    }
    try {
        const inspirations = await mongodb.getDatabase().db('seerstone').collection('inspirations').find({ userId, step }).toArray();
        res.status(200).json(inspirations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllInspirations,
    getSingleInspiration,
    createInspiration,
    updateInspiration,
    deleteInspiration,
    getInspirationsByUserId,
    getInspirationsByUserIdAndType,
    getInspirationsByUserIdAndStep
};