//...This is the controllers/users.js file...

const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const createUser = async (req, res) => {
    //#swagger.tags=['users']
    const newUser = req.body;
    try {
        const result = await mongodb.getDatabase().db('seerstone').collection('users').insertOne(newUser);
        res.status(201).json(result.ops[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserById = async (req, res) => {
    //#swagger.tags=['users']
    const { id } = req.params;
    try {
        const user = await mongodb.getDatabase().db('seerstone').collection('users').findOne({ _id: ObjectId(id) });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUserById = async (req, res) => {
    //#swagger.tags=['users']
    const { id } = req.params;
    const updatedUser = req.body;
    try {
        const result = await mongodb.getDatabase().db('seerstone').collection('users').updateOne(
            { _id: ObjectId(id) },
            { $set: updatedUser }
        );
        if (result.modifiedCount === 1) {
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUserById = async (req, res) => {
    //#swagger.tags=['users']
    const { id } = req.params;
    try {
        const result = await mongodb.getDatabase().db('seerstone').collection('users').deleteOne({ _id: ObjectId(id) });
        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createUser,
    getUserById,
    updateUserById,
    deleteUserById
};