const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Создание породы (только для администраторов)
exports.createBreed = async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Недостаточно прав для создания породы' });
  }

  const { name, speciesId } = req.body;
  try {
    const breed = await prisma.breed.create({ data: { name, speciesId } });
    res.status(201).json(breed);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании породы' });
  }
};

// Получение всех пород
exports.getBreeds = async (req, res) => {
  try {
    const breeds = await prisma.breed.findMany({
      include: {
        species: true, // Включаем информацию о виде
      }
    });
    res.status(200).json(breeds);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении пород' });
  }
};

// Обновление породы (только для администраторов)
exports.updateBreed = async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Недостаточно прав для обновления породы' });
  }

  const { id } = req.params;
  const { name, speciesId } = req.body;

  try {
    const updatedBreed = await prisma.breed.update({
      where: { id: Number(id) },
      data: { name, speciesId },
    });
    res.status(200).json(updatedBreed);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении породы' });
  }
};

// Удаление породы (только для администраторов)
exports.deleteBreed = async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Недостаточно прав для удаления породы' });
  }

  const { id } = req.params;

  try {
    await prisma.breed.delete({ where: { id: Number(id) } });
    res.status(204).json({ message: 'Порода удалена' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении породы' });
  }
};
