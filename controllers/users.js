//...This is the controllers/users.js file...

const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
    //#swagger.tags=['users']
    try {
        const result = await mongodb.getDatabase().db('seerstone').collection('users').find();
        result.toArray().then((users) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserById = async (req, res) => {
    //#swagger.tags=['users']
    try {
        const userId = req.params.userId;
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const result = await mongodb.getDatabase().db('seerstone').collection('users').find({ _id: ObjectId(userId) });
        result.toArray().then((users) => {
            if (users.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createUser = async (req, res) => {
    //#swagger.tags=['users']
    try {
        const { 
            user_id, 
            username, 
            first_name, 
            last_name, 
            email 
        } = req.body;

        const newUser = {
            user_id,
            username,
            first_name,
            last_name,
            email
        };

        const result = await mongodb.getDatabase().db('seerstone').collection('users').insertOne(newUser);
        if (result.acknowledged) {
            res.status(201).json(result.ops[0]);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the user.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUserById = async (req, res) => {
    //#swagger.tags=['users']
    try {
        const userId = ObjectId(req.params.id);
        const { 
            user_id, 
            username, 
            first_name, 
            last_name, 
            email 
        } = req.body;

        const newUser = {
            user_id,
            username,
            first_name,
            last_name,
            email
        };

        const response = await mongodb.getDatabase().db('seerstone').collection('users').replaceOne({ _id: userId }, newUser);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the user.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUserById = async (req, res) => {
    //#swagger.tags=['users']
    try {
        const userId = ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db('seerstone').collection('users').deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the user.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById
};