const express = require('express');
const router = express.Router();
const animalSpeciesController = require('../controllers/animalSpeciesController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, authorizeRole(['ADMIN']), animalSpeciesController.createAnimalSpecies);
router.get('/', animalSpeciesController.getAnimalSpecies);
router.put('/:id', authenticateToken, authorizeRole(['ADMIN']), animalSpeciesController.updateAnimalSpecies);
router.delete('/:id', authenticateToken, authorizeRole(['ADMIN']), animalSpeciesController.deleteAnimalSpecies);

module.exports = router;
