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
    if (!ObjectId.isValid(inspirationId)) {
        return res.status(400).json({ error: 'Invalid inspiration ID' });
    }

    try {
        const result = await mongodb.getDatabase().db('seerstone').collection('inspirations').find({ _id: ObjectId(inspirationId) });
        result.toArray().then((inspirations) => {
            if (inspirations.length === 0) {
                return res.status(404).json({ error: 'Inspiration not found' });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(inspirations[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

  const createInspiration = async (req, res) => {
    // #swagger.tags=['inspirations']
    const {
        user_id,
        type,
        step,
        parent_id,
        child_id,
        evidence,
        acted_on,
        planned,
        reviewed,
        recorded,
    } = req.body;

    // Data validation
    if (!user_id || !type || !step|| !parent_id|| !child_id|| !evidence|| !acted_on|| !planned|| !reviewed|| !recorded) {
        return res.status(400).json({ error: "user_id, type, step, parent_id, child_id, evidence, acted_on, planned, reviewed and recorded are required fields." });
    }

    // Create the new inspiration object
    const newInspiration = {
        user_id,
        type,
        step,
        parent_id,
        child_id,
        evidence,
        acted_on,
        planned,
        reviewed,
        recorded,
    };

    try {
        const result = await mongodb.getDatabase().db('seerstone')
            .collection('inspirations')
            .insertOne(newInspiration);

        // Check if the inspiration was successfully updated
        if (response.acknowledged) {
            return res.status(204).send();// Success
        } else {
            return res.status(500).json('Some error occurred while creating the inspiration.');// Internal server error
        }
    } catch (error) {
        return res.status(500).json(error.message || 'Some error occurred while creating the inspiration.');// Internal server error
    }
};

const updateInspiration = async (req, res) => {
    // #swagger.tags=['inspirations']
    const inspirationId = ObjectId(req.params.id);
    const {
        user_id,
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
    if (!user_id || !type || !step|| !parent_id|| !child_id|| !evidence|| !acted_on|| !planned|| !reviewed|| !recorded) {
        return res.status(400).json({ error: "user_id, type, step, parent_id, child_id, evidence, acted_on, planned, reviewed and recorded are required fields." });
    }

    const updatedInspiration = {
        user_id,
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
            return res.status(204).send(); // Success
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
        const inspirationId = ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db('seerstone').collection('inspirations').deleteOne({ _id: inspirationId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the inspiration.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getInspirationsByUserId = async (req, res) => {
    // #swagger.tags=['inspirations']
    const { user_id } = req.query; // Use req.query to access query parameters
    if (!user_id) {
        return res.status(400).json({ error: 'user_id is required' });
    }
    try {
        const inspirations = await mongodb.getDatabase().db('seerstone').collection('inspirations').find({ user_id: user_id }).toArray();
        res.status(200).json(inspirations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getInspirationsByUserIdAndType = async (req, res) => {
    // #swagger.tags=['inspirations']
    const { user_id, type } = req.query; // Use req.query to access query parameters
    if (!user_id || !type) {
        return res.status(400).json({ error: 'user_id and type are required' });
    }
    try {
        const inspirations = await mongodb.getDatabase().db('seerstone').collection('inspirations').find({ user_id, type }).toArray();
        res.status(200).json(inspirations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getInspirationsByUserIdAndStep = async (req, res) => {
    //#swagger.tags=['inspirations']
    const { user_id, step } = req.query; // Use req.query to access query parameters
    if (!user_id || !step) {
        return res.status(400).json({ error: 'user_id and step are required' });
    }
    try {
        const inspirations = await mongodb.getDatabase().db('seerstone').collection('inspirations').find({ user_id, step }).toArray();
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