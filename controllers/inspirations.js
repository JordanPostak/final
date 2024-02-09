//...This is the controllers/inspirations.js file...

const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getAllInspirations = async (req, res) => {
    //#swagger.tags=['inspirations']
    try {
        const inspirations = await mongodb.getDatabase().db('seerstone').collection('inspirations').find({}).toArray();
        res.status(200).json(inspirations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSingleInspiration = async (req, res) => {
    //#swagger.tags=['inspirations']
    const { id } = req.params;
    try {
        const inspiration = await mongodb.getDatabase().db('seerstone').collection('inspirations').findOne({ _id: ObjectId(id) });
        if (inspiration) {
            res.status(200).json(inspiration);
        } else {
            res.status(404).json({ error: 'Inspiration not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createInspiration = async (req, res) => {
    //#swagger.tags=['inspirations']
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
        recorded
    };

    try {
        const result = await mongodb.getDatabase().db('seerstone').collection('inspirations').insertOne(newInspiration);
        res.status(201).json(result.ops[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateInspiration = async (req, res) => {
    //#swagger.tags=['inspirations']
    const { id } = req.params;
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
        const result = await mongodb.getDatabase().db('seerstone').collection('inspirations').updateOne(
            { _id: ObjectId(id) },
            { $set: updatedInspiration }
        );
        if (result.modifiedCount === 1) {
            res.status(200).json({ message: 'Inspiration updated successfully' });
        } else {
            res.status(404).json({ error: 'Inspiration not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteInspiration = async (req, res) => {
    //#swagger.tags=['inspirations']
    const { id } = req.params;
    try {
        const result = await mongodb.getDatabase().db('seerstone').collection('inspirations').deleteOne({ _id: ObjectId(id) });
        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Inspiration deleted successfully' });
        } else {
            res.status(404).json({ error: 'Inspiration not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getInspirationsByUserId = async (req, res) => {
    //#swagger.tags=['inspirations']
    const { user_id } = req.body;
    try {
        const inspirations = await mongodb.getDatabase().db('seerstone').collection('inspirations').find({ user_id }).toArray();
        res.status(200).json(inspirations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getInspirationsByUserIdAndType = async (req, res) => {
    //#swagger.tags=['inspirations']
    const { user_id, type } = req.body;
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
    const { user_id, step } = req.body;
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