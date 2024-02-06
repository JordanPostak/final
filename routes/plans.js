//...This is the routes/plans.js  file...

const express = require('express');
const router = express.Router();

const plansController = require('../controllers/plans');
const { isAuthenticated } = require('../middleware/authenticate');

// GET all plans
router.get('/', plansController.getAllPlans);

// GET a single plan by ID
router.get('/:id', plansController.getSinglePlan);

// POST a new plan (logged in)
router.post('/', isAuthenticated, plansController.createPlan);

// PUT (update) a plan by ID (logged in)
router.put('/:id', isAuthenticated, plansController.updatePlan);

// DELETE a plan by ID (logged in)
router.delete('/:id', isAuthenticated, plansController.deletePlan);

module.exports = router;