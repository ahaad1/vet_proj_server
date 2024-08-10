const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Создание подкатегории (только для администраторов)
exports.createSubCategory = async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Недостаточно прав для создания подкатегории' });
  }

  const { name, categoryId } = req.body;
  try {
    const subCategory = await prisma.subCategory.create({ data: { name, categoryId } });
    res.status(201).json(subCategory);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании подкатегории' });
  }
};

// Получение всех подкатегорий
exports.getSubCategories = async (req, res) => {
  try {
    const subCategories = await prisma.subCategory.findMany({
      include: {
        category: true, // Включаем информацию о категории
      }
    });
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении подкатегорий' });
  }
};

// Обновление подкатегории (только для администраторов)
exports.updateSubCategory = async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Недостаточно прав для обновления подкатегории' });
  }

  const { id } = req.params;
  const { name, categoryId } = req.body;

  try {
    const updatedSubCategory = await prisma.subCategory.update({
      where: { id: Number(id) },
      data: { name, categoryId },
    });
    res.status(200).json(updatedSubCategory);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении подкатегории' });
  }
};

// Удаление подкатегории (только для администраторов)
exports.deleteSubCategory = async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Недостаточно прав для удаления подкатегории' });
  }

  const { id } = req.params;

  try {
    await prisma.subCategory.delete({ where: { id: Number(id) } });
    res.status(204).json({ message: 'Подкатегория удалена' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении подкатегории' });
  }
};
