//...This is the routes/users.js file...

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.post('/', usersController.createUser);
router.get('/:id', usersController.getUserById);
router.put('/:id', usersController.updateUserById);
router.delete('/:id', usersController.deleteUserById);

module.exports = router;