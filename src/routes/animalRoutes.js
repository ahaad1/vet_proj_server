const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, authorizeRole(['ADMIN']), animalController.createAnimal);
router.get('/', animalController.getAnimals);
router.put('/:id', authenticateToken, authorizeRole(['ADMIN']), animalController.updateAnimal);
router.delete('/:id', authenticateToken, authorizeRole(['ADMIN']), animalController.deleteAnimal);

module.exports = router;
