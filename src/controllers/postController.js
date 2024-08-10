const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
exports.createPost = async (req, res) => {
  const { title, description, categoryId, contactPhoneNum, expirationDate, imgUrls, country_id, region_id, city_id, district_id, animalId } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        description,
        categoryId,
        userId: req.user.userId,  // Используем ID пользователя из токена
        contactPhoneNum,
        expirationDate,
        imgUrls,
        country_id,
        region_id,
        city_id,
        district_id,
        animalId,
      },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании поста' });
  }
};

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
exports.getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true, // Включаем информацию о пользователе
        category: true, // Включаем информацию о категории
      }
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении постов' });
  }
};

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
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description, categoryId, contactPhoneNum, expirationDate, imgUrls, country_id, region_id, city_id, district_id, animalId } = req.body;

  try {
    const post = await prisma.post.findUnique({ where: { id: Number(id) } });

    if (post.userId !== req.user.userId && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Недостаточно прав для изменения этого поста' });
    }

    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        categoryId,
        contactPhoneNum,
        expirationDate,
        imgUrls,
        country_id,
        region_id,
        city_id,
        district_id,
        animalId,
      },
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении поста' });
  }
};

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
exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({ where: { id: Number(id) } });

    if (post.userId !== req.user.userId && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Недостаточно прав для удаления этого поста' });
    }

    await prisma.post.delete({ where: { id: Number(id) } });
    res.status(204).json({ message: 'Пост удален' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении поста' });
  }
};
