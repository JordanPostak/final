//...This is the routes/journals.js file...

const express = require('express');
const router = express.Router();

const journalsController = require('../controllers/journals');
const { isAuthenticated } = require('../middleware/authenticate');

// GET all journals
router.get('/', journalsController.getAllJournals);

// GET a single journal by ID
router.get('/:id', journalsController.getSingleJournal);

// POST a new journal (logged in)
router.post('/', isAuthenticated, journalsController.createJournal);

// PUT (update) a journal by ID (logged in)
router.put('/:id', isAuthenticated, journalsController.updateJournal);

// DELETE a journal by ID (logged in)
router.delete('/:id', isAuthenticated, journalsController.deleteJournal);

module.exports = router;