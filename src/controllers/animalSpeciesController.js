const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Создание вида животного (только для администраторов)
exports.createAnimalSpecies = async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Недостаточно прав для создания вида животного' });
  }

  const { name } = req.body;
  try {
    const animalSpecies = await prisma.animalSpecies.create({ data: { name } });
    res.status(201).json(animalSpecies);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании вида животного' });
  }
};

// Получение всех видов животных
exports.getAnimalSpecies = async (req, res) => {
  try {
    const animalSpecies = await prisma.animalSpecies.findMany();
    res.status(200).json(animalSpecies);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении видов животных' });
  }
};

// Обновление вида животного (только для администраторов)
exports.updateAnimalSpecies = async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Недостаточно прав для обновления вида животного' });
  }

  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedAnimalSpecies = await prisma.animalSpecies.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.status(200).json(updatedAnimalSpecies);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении вида животного' });
  }
};

// Удаление вида животного (только для администраторов)
exports.deleteAnimalSpecies = async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Недостаточно прав для удаления вида животного' });
  }

  const { id } = req.params;

  try {
    await prisma.animalSpecies.delete({ where: { id: Number(id) } });
    res.status(204).json({ message: 'Вид животного удален' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении вида животного' });
  }
};
