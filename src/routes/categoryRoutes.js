const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, authorizeRole(['ADMIN']), categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.put('/:id', authenticateToken, authorizeRole(['ADMIN']), categoryController.updateCategory);
router.delete('/:id', authenticateToken, authorizeRole(['ADMIN']), categoryController.deleteCategory);

module.exports = router;
