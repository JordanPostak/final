//...This is the routes/inspirations.js file...

const express = require('express');
const router = express.Router();
const inspirationsController = require('../controllers/inspirations');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', inspirationsController.getAllInspirations);
router.post('/',  inspirationsController.createInspiration);
router.get('/:id',  inspirationsController.getSingleInspiration);
router.put('/:id',  inspirationsController.updateInspiration);
router.delete('/:id',  inspirationsController.deleteInspiration);
router.get('/user_id/:user_id',  inspirationsController.getInspirationsByUserId);
router.get('/user_id/:user_id/type/:type',  inspirationsController.getInspirationsByUserIdAndType);
router.get('/user_id/:user_id/step/:step', inspirationsController.getInspirationsByUserIdAndStep);

module.exports = router;