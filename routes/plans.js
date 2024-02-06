const express = require('express');
const router = express.Router();
const plansController = require('../controllers/plans');

router.post('/', plansController.createPlanEntry);
router.get('/:id', plansController.getPlanEntryById);
router.put('/:id', plansController.updatePlanEntryById);
router.delete('/:id', plansController.deletePlanEntryById);
router.get('/user/:id', plansController.getPlanEntriesByUserId);
router.get('/user/:id/inspiration/:id', plansController.getPlanEntriesByUserIdAndInspirationId);

module.exports = router;