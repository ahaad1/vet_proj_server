const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

router.post('/', cityController.createCity);
router.get('/', cityController.getCities);

// Добавь остальные маршруты (update, delete) по аналогии

module.exports = router;
