//...This is the routes/journals.js file...

const express = require('express');
const router = express.Router();
const journalsController = require('../controllers/journals');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', journalsController.getAllJournalEntries);
router.post('/', journalsController.createJournalEntry);
router.get('/:id', journalsController.getJournalEntryById);
router.put('/:id', journalsController.updateJournalEntryById);
router.delete('/:id', journalsController.deleteJournalEntryById);
router.get('/user_id/:user_id', journalsController.getJournalEntriesByUserId);
router.get('/user_id/:user_id/inspiration_id/:inspiration_id', isAuthenticated, journalsController.getJournalEntriesByUserIdAndInspirationId);

module.exports = router;