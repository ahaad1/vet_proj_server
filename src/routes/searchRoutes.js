const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Поиск и фильтрация
 */

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Поиск по ключевым словам
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Ключевые слова для поиска
 *     responses:
 *       200:
 *         description: Результаты поиска
 *       500:
 *         description: Ошибка сервера
 */
router.get('/search', searchController.search);

/**
 * @swagger
 * /api/filter:
 *   get:
 *     summary: Фильтрация данных
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: ID категории
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: ID пользователя
 *       - in: query
 *         name: country_id
 *         schema:
 *           type: integer
 *         description: ID страны
 *       - in: query
 *         name: region_id
 *         schema:
 *           type: integer
 *         description: ID региона
 *       - in: query
 *         name: city_id
 *         schema:
 *           type: integer
 *         description: ID города
 *       - in: query
 *         name: district_id
 *         schema:
 *           type: integer
 *         description: ID района
 *       - in: query
 *         name: animalId
 *         schema:
 *           type: integer
 *         description: ID животного
 *     responses:
 *       200:
 *         description: Результаты фильтрации
 *       500:
 *         description: Ошибка сервера
 */
router.get('/filter', searchController.filter);

module.exports = router;
