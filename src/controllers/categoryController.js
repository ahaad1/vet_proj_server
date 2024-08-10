const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Создание категории (только для администраторов)
exports.createCategory = async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Недостаточно прав для создания категории' });
  }

  const { name } = req.body;
  try {
    const category = await prisma.category.create({ data: { name } });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании категории' });
  }
};

// Получение всех категорий
exports.getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении категорий' });
  }
};

// Обновление категории (только для администраторов)
exports.updateCategory = async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Недостаточно прав для обновления категории' });
  }

  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении категории' });
  }
};

// Удаление категории (только для администраторов)
exports.deleteCategory = async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Недостаточно прав для удаления категории' });
  }

  const { id } = req.params;

  try {
    await prisma.category.delete({ where: { id: Number(id) } });
    res.status(204).json({ message: 'Категория удалена' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении категории' });
  }
};
