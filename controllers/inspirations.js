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
    const newInspiration = req.body;
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
    const updatedInspiration = req.body;
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

const getInspirationsByUserId = async (req, res) => {//#swagger.tags=['inspirations']
    const { id } = req.params;
    try {
        const inspirations = await mongodb.getDatabase().db('seerstone').collection('inspirations').find({ user_id: id }).toArray();
        res.status(200).json(inspirations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getInspirationsByUserIdAndType = async (req, res) => {//#swagger.tags=['inspirations']
    const { id, type } = req.params;
    try {
        const inspirations = await mongodb.getDatabase().db('seerstone').collection('inspirations').find({ user_id: id, type }).toArray();
        res.status(200).json(inspirations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getInspirationsByUserIdAndStep = async (req, res) => {//#swagger.tags=['inspirations']
    const { id, step } = req.params;
    try {
        const inspirations = await mongodb.getDatabase().db('seerstone').collection('inspirations').find({ user_id: id, step }).toArray();
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