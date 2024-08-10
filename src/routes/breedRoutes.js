const express = require('express');
const router = express.Router();
const breedController = require('../controllers/breedController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, authorizeRole(['ADMIN']), breedController.createBreed);
router.get('/', breedController.getBreeds);
router.put('/:id', authenticateToken, authorizeRole(['ADMIN']), breedController.updateBreed);
router.delete('/:id', authenticateToken, authorizeRole(['ADMIN']), breedController.deleteBreed);

module.exports = router;
