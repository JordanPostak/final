const express = require('express');
const router = express.Router();
const journalsController = require('../controllers/journals');

router.post('/', journalsController.createJournalEntry);
router.get('/:id', journalsController.getJournalEntryById);
router.put('/:id', journalsController.updateJournalEntryById);
router.delete('/:id', journalsController.deleteJournalEntryById);
router.get('/user/:id', journalsController.getJournalEntriesByUserId);
router.get('/user/:id/inspiration/:id', journalsController.getJournalEntriesByUserIdAndInspirationId);

module.exports = router;