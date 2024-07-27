//...This is the routes/plans.js file...

const express = require('express');
const router = express.Router();
const plansController = require('../controllers/plans');
const { isAuthenticated } = require('../middleware/authenticate');
const { loginCors, simpleCors } = require('../middleware/corsMiddleware');

router.get('/', simpleCors, plansController.getAllPlanEntries);
router.post('/', isAuthenticated, plansController.createPlanEntry);
router.get('/:id', isAuthenticated, plansController.getPlanEntryById);
router.put('/:id', isAuthenticated, plansController.updatePlanEntryById);
router.delete('/:id', isAuthenticated, plansController.deletePlanEntryById);
router.get('/user_id/:user_id', isAuthenticated, plansController.getPlanEntriesByUserId);
router.get('/user_id/:user_id/inspiration_id/:inspiration_id', isAuthenticated, plansController.getPlanEntriesByUserIdAndInspirationId);

module.exports = router;