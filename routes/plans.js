//...This is the routes/plans.js file...

const express = require('express');
const router = express.Router();
const plansController = require('../controllers/plans');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', plansController.getAllPlanEntries);
router.post('/', isAuthenticated, plansController.createPlanEntry);
router.get('/:id', isAuthenticated, plansController.getPlanEntryById);
router.put('/:id', isAuthenticated, plansController.updatePlanEntryById);
router.delete('/:id', isAuthenticated, plansController.deletePlanEntryById);
router.get('/user/:user_id', isAuthenticated, plansController.getPlanEntriesByUserId);
router.get('/user/:id/inspiration/:id', isAuthenticated, plansController.getPlanEntriesByUserIdAndInspirationId);

module.exports = router;