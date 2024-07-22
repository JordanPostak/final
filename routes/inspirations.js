//...This is the routes/inspirations.js file...

const express = require('express');
const router = express.Router();
const inspirationsController = require('../controllers/inspirations');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/',  inspirationsController.getAllInspirations);
router.post('/',isAuthenticated,  inspirationsController.createInspiration);
router.get('/:id',isAuthenticated,  inspirationsController.getSingleInspiration);
router.put('/:id',isAuthenticated,  inspirationsController.updateInspiration);
router.delete('/:id',isAuthenticated,  inspirationsController.deleteInspiration);
router.get('/user_id/:user_id',isAuthenticated,  inspirationsController.getInspirationsByUserId);
router.get('/user_id/:user_id/type/:type',isAuthenticated,  inspirationsController.getInspirationsByUserIdAndType);
router.get('/user_id/:user_id/step/:step', inspirationsController.getInspirationsByUserIdAndStep);

module.exports = router;