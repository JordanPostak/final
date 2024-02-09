//...This is the routes/journals.js file...

const express = require('express');
const router = express.Router();
const journalsController = require('../controllers/journals');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', journalsController.getAllJournalEntries);
router.post('/', isAuthenticated, journalsController.createJournalEntry);
router.get('/:id', isAuthenticated, journalsController.getJournalEntryById);
router.put('/:id', isAuthenticated, journalsController.updateJournalEntryById);
router.delete('/:id', isAuthenticated, journalsController.deleteJournalEntryById);
router.get('/user/:id', isAuthenticated, journalsController.getJournalEntriesByUserId);
router.get('/user/:id/inspiration/:id', isAuthenticated, journalsController.getJournalEntriesByUserIdAndInspirationId);

module.exports = router;