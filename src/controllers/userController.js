const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const secretKey = process.env.JWT_SECRET || '8ogho8aehrgoa8hgahrgliahgkajlerhglkaehrgjklhae';

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
exports.registerUser = async (req, res) => {
  const { fullName, email, password, imageUrl, phoneNum, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        imageUrl,
        phoneNum,
        role,
      }
    });

    const token = jwt.sign({ userId: user.id, role: user.role }, secretKey, { expiresIn: '1h' });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при регистрации пользователя' });
  }
};

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
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Неверный пароль' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при входе' });
  }
};

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
exports.getUsers = async (req, res) => {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Недостаточно прав для просмотра пользователей' });
    }

    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении пользователей' });
  }
};
