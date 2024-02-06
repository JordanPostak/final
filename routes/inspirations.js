//...This is the routes/inspirations.js file...

const express = require('express');
const router = express.Router();

const inspirationsController = require('../controllers/inspirations');
const { isAuthenticated } = require('../middleware/authenticate');

// GET all inspirations
router.get('/', inspirationsController.getAllInspirations);

// GET a single inspiration by ID
router.get('/:id', inspirationsController.getSingleInspiration);

// POST a new inspiration (logged in)
router.post('/', isAuthenticated, inspirationsController.createInspiration);

// PUT (update) an inspiration by ID (logged in)
router.put('/:id', isAuthenticated, inspirationsController.updateInspiration);

// DELETE an inspiration by ID (logged in)
router.delete('/:id', isAuthenticated, inspirationsController.deleteInspiration);

module.exports = router;