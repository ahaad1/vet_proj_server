const express = require('express');
const router = express.Router();
const regionController = require('../controllers/regionController');

router.post('/', regionController.createRegion);
router.get('/', regionController.getRegions);

// Добавь остальные маршруты (update, delete) по аналогии

module.exports = router;
