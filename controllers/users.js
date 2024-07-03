//...This is the controllers/users.js file...

const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const { generateUniqueUserId } = require('../utils/idUtils');

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

const registerUser = async (req, res) => {
    const { username, password, first_name, last_name, email } = req.body;

    // Data validation
    if (!username || !password || !first_name || !last_name || !email) {
        return res.status(400).json({ error: "username, password, first_name, last_name, and email are required fields." });
    }

    // Generate a unique user_id
    const user_id = generateUniqueUserId();

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create the new user object
    const newUser = {
        user_id: user_id,
        username,
        password: hashedPassword,
        first_name,
        last_name,
        email
    };

    try {
        const response = await mongodb.getDatabase().db('seerstone').collection('users').insertOne(newUser);

        if (response.acknowledged) {
            return res.status(201).json({ message: 'User successfully registered', user: newUser });
        } else {
            return res.status(500).json('Failed to register user.');
        }
    } catch (error) {
        return res.status(500).json(error.message || 'Failed to register user.');
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await mongodb.getDatabase().db('seerstone').collection('users').findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Compare hashed password
        const isPasswordMatch = await comparePassword(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
    
        // Set user session
        req.session.user = user;

        res.status(200).json({ message: 'Login successful.', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to authenticate.' });
    }
};

const updateUserById = async (req, res) => {
    //#swagger.tags=['users']
    const userId = req.session.user.user_id; // Get user_id from session
    const { username, password, first_name, last_name, email } = req.body;

    // Data validation
    if (!username || !password || !first_name || !last_name || !email) {
        return res.status(400).json({ error: "username, password, first_name, last_name, and email are required fields." });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create the updated user object
    const updatedUser = {
        user_id: userId,
        username,
        password: hashedPassword,
        first_name,
        last_name,
        email
    };

    try {
        // Update the user in the database
        const response = await mongodb.getDatabase().db('seerstone').collection('users').replaceOne({ user_id: userId }, updatedUser);

        // Check if the user was successfully updated
        if (response.modifiedCount > 0) {
            return res.status(200).json({ message: 'User successfully updated', user: updatedUser }); // Successfully updated
        } else {
            return res.status(404).json({ error: "User not found." }); // User with given ID not found
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' }); // Internal server error
    }
};

const deleteUserById = async (req, res) => {
    //#swagger.tags=['users']
    try {
        const userId = req.session.user.user_id; // Get user_id from session
        const response = await mongodb.getDatabase().db('seerstone').collection('users').deleteOne({ user_id: userId });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'User successfully deleted' });
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const logoutUser = (req, res) => {
    //#swagger.tags=['users']
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to logout.' });
        }
        res.status(200).json({ message: 'Logout successful.' });
    });
};

module.exports = {
    getAllUsers,
    registerUser,
    loginUser,
    getUserById,
    updateUserById,
    deleteUserById,
    logoutUser
};