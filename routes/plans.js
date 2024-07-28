//...This is the routes/plans.js file...

const express = require('express');
const router = express.Router();
const plansController = require('../controllers/plans');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', plansController.getAllPlanEntries);
router.post('/', plansController.createPlanEntry);
router.get('/:id', plansController.getPlanEntryById);
router.put('/:id', plansController.updatePlanEntryById);
router.delete('/:id', plansController.deletePlanEntryById);
router.get('/user_id/:user_id', plansController.getPlanEntriesByUserId);
router.get('/user_id/:user_id/inspiration_id/:inspiration_id', plansController.getPlanEntriesByUserIdAndInspirationId);

module.exports = router;