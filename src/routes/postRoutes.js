const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Управление постами
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Создание нового поста
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *               contactPhoneNum:
 *                 type: string
 *               expirationDate:
 *                 type: string
 *                 format: date-time
 *               imgUrls:
 *                 type: array
 *                 items:
 *                   type: string
 *               country_id:
 *                 type: integer
 *               region_id:
 *                 type: integer
 *               city_id:
 *                 type: integer
 *               district_id:
 *                 type: integer
 *               animalId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Пост создан
 *       500:
 *         description: Ошибка сервера
 */
router.post('/', authenticateToken, postController.createPost);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Получение всех постов
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Список постов
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', postController.getPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Обновление поста
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID поста
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *               contactPhoneNum:
 *                 type: string
 *               expirationDate:
 *                 type: string
 *                 format: date-time
 *               imgUrls:
 *                 type: array
 *                 items:
 *                   type: string
 *               country_id:
 *                 type: integer
 *               region_id:
 *                 type: integer
 *               city_id:
 *                 type: integer
 *               district_id:
 *                 type: integer
 *               animalId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Пост обновлен
 *       403:
 *         description: Недостаточно прав для изменения поста
 *       500:
 *         description: Ошибка сервера
 */
router.put('/:id', authenticateToken, postController.updatePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Удаление поста
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID поста
 *     responses:
 *       204:
 *         description: Пост удален
 *       403:
 *         description: Недостаточно прав для удаления поста
 *       500:
 *         description: Ошибка сервера
 */
router.delete('/:id', authenticateToken, postController.deletePost);

module.exports = router;
