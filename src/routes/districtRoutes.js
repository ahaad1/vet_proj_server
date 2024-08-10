const express = require('express');
const router = express.Router();
const districtController = require('../controllers/districtController');

router.post('/', districtController.createDistrict);
router.get('/', districtController.getDistricts);

// Добавь остальные маршруты (update, delete) по аналогии

module.exports = router;
