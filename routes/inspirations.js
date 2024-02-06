//...This is the routes/inspirations.js file...

const express = require('express');
const router = express.Router();
const inspirationsController = require('../controllers/inspirations');

router.post('/', inspirationsController.createInspiration);
router.get('/:id', inspirationsController.getInspirationById);
router.put('/:id', inspirationsController.updateInspirationById);
router.delete('/:id', inspirationsController.deleteInspirationById);
router.get('/user/:id', inspirationsController.getInspirationsByUserId);
router.get('/user/:id/type/:type', inspirationsController.getInspirationsByUserIdAndType);
router.get('/user/:id/step/:step', inspirationsController.getInspirationsByUserIdAndStep);

module.exports = router;