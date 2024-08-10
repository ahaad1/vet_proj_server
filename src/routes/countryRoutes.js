const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');

router.post('/', countryController.createCountry);
router.get('/', countryController.getCountries);

// Добавь остальные маршруты (update, delete) по аналогии

module.exports = router;
