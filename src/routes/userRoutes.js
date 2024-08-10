const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Управление пользователями
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Регистрация пользователя
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *                 nullable: true
 *               phoneNum:
 *                 type: string
 *                 nullable: true
 *               role:
 *                 type: string
 *                 enum: [ADMIN, USER, GUEST]
 *     responses:
 *       201:
 *         description: Успешная регистрация
 *       500:
 *         description: Ошибка сервера
 */
router.post('/register', userController.registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Вход пользователя
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успешный вход
 *       401:
 *         description: Неверный пароль
 *       404:
 *         description: Пользователь не найден
 *       500:
 *         description: Ошибка сервера
 */
router.post('/login', userController.loginUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Получение всех пользователей
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список пользователей
 *       403:
 *         description: Недостаточно прав
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', authenticateToken, authorizeRole(['ADMIN']), userController.getUsers);

module.exports = router;
