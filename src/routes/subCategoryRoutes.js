const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategoryController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, authorizeRole(['ADMIN']), subCategoryController.createSubCategory);
router.get('/', subCategoryController.getSubCategories);
router.put('/:id', authenticateToken, authorizeRole(['ADMIN']), subCategoryController.updateSubCategory);
router.delete('/:id', authenticateToken, authorizeRole(['ADMIN']), subCategoryController.deleteSubCategory);

module.exports = router;
