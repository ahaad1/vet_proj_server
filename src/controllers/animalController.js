const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Создание животного (только для администраторов)
exports.createAnimal = async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Недостаточно прав для создания животного' });
  }

  const { name, speciesId, breedId, age, description } = req.body;
  try {
    const animal = await prisma.animal.create({ data: { name, speciesId, breedId, age, description } });
    res.status(201).json(animal);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании животного' });
  }
};

// Получение всех животных
exports.getAnimals = async (req, res) => {
  try {
    const animals = await prisma.animal.findMany({
      include: {
        species: true, // Включаем информацию о виде
        breed: true,   // Включаем информацию о породе
      }
    });
    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении животных' });
  }
};

// Обновление животного (только для администраторов)
exports.updateAnimal = async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Недостаточно прав для обновления информации о животном' });
  }

  const { id } = req.params;
  const { name, speciesId, breedId, age, description } = req.body;

  try {
    const updatedAnimal = await prisma.animal.update({
      where: { id: Number(id) },
      data: { name, speciesId, breedId, age, description },
    });
    res.status(200).json(updatedAnimal);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении информации о животном' });
  }
};

// Удаление животного (только для администраторов)
exports.deleteAnimal = async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Недостаточно прав для удаления животного' });
  }

  const { id } = req.params;

  try {
    await prisma.animal.delete({ where: { id: Number(id) } });
    res.status(204).json({ message: 'Животное удалено' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении животного' });
  }
};
