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
    const userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid userID' });
    }

    try {
        const cursor = await mongodb.getDatabase().db('seerstone').collection('users').find({ _id: new ObjectId(userId) });

        cursor.toArray().then((users) => {

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
    const {
        user_id,
        username,
        password,
        first_name,
        last_name,
        email
    } = req.body;

    // Data validation
    if (!user_id || !username || !password || !first_name || !last_name || !email) {
        return res.status(400).json({ error: "user_id, username, password, first_name, last_name and email are required fields." });
    }

    // Create the new inspiration object
    const newUser = {
        user_id,
        username,
        password,
        first_name,
        last_name,
        email
    };

    try {
        const response = await mongodb.getDatabase().db('seerstone')
            .collection('users')
            .insertOne(newUser);

        // Check if the inspiration was successfully updated
        if (response.acknowledged) {
            return res.status(201).json({ message: 'User successfully created', user: newUser });// Successfully created
        } else {
            return res.status(500).json('Some error occurred while creating the user.');// Internal server error
        }
    } catch (error) {
        return res.status(500).json(error.message || 'Some error occurred while creating the user.');// Internal server error
    }
};

const updateUserById = async (req, res) => {
    //#swagger.tags=['users']
    const userId = new ObjectId(req.params.id);
    const {
        user_id,
        username,
        password,
        first_name,
        last_name,
        email
    } = req.body;

    // Data validation
    if (!user_id || !username || !password || !first_name || !last_name || !email) {
        return res.status(400).json({ error: "user_id, username, password, first_name, last_name and email are required fields." });
    }

    // Create the new inspiration object
    const updatedUser = {
        user_id,
        username,
        password,
        first_name,
        last_name,
        email
    };

    try {
        // Update the inspiration in the database
        const response = await mongodb.getDatabase().db('seerstone').collection('users').replaceOne({ _id: userId }, updatedUser);

        // Check if the inspiration was successfully updated
        if (response.modifiedCount > 0) {
            return res.status(200).json({ message: 'User successfully updated', user: updatedUser}); // Successfully updated
        } else {
            return res.status(404).json({ error: "User not found." }); // User with given ID not found
        }
    } catch (error) {
        return res.status(500).json(error.message || 'Some error occurred while updating the user.'); // Internal server error
    }
};

const deleteUserById = async (req, res) => {
    //#swagger.tags=['users']
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db('seerstone').collection('users').deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'User successfully deleted'});
        } else {
            res.status(404).json(response.error || 'Some error occurred while deleting the user.');
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