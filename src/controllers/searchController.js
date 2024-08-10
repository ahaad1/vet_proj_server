const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
exports.search = async (req, res) => {
  const { query } = req.query;

  try {
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } }
        ],
      },
      include: {
        user: true,
        category: true,
        country: true,
        region: true,
        city: true,
        district: true,
        animal: true,
      }
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при выполнении поиска' });
  }
};

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
exports.filter = async (req, res) => {
  const { categoryId, userId, country_id, region_id, city_id, district_id, animalId } = req.query;

  try {
    const posts = await prisma.post.findMany({
      where: {
        AND: [
          categoryId ? { categoryId: Number(categoryId) } : {},
          userId ? { userId: Number(userId) } : {},
          country_id ? { country_id: Number(country_id) } : {},
          region_id ? { region_id: Number(region_id) } : {},
          city_id ? { city_id: Number(city_id) } : {},
          district_id ? { district_id: Number(district_id) } : {},
          animalId ? { animalId: Number(animalId) } : {},
        ],
      },
      include: {
        user: true,
        category: true,
        country: true,
        region: true,
        city: true,
        district: true,
        animal: true,
      }
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при выполнении фильтрации' });
  }
};
