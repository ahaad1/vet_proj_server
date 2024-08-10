const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createCity = async (req, res) => {
  const { name, regionId } = req.body;
  try {
    const city = await prisma.city.create({ data: { name, regionId } });
    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании города' });
  }
};

exports.getCities = async (req, res) => {
  try {
    const cities = await prisma.city.findMany();
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении городов' });
  }
};

// Добавь остальные методы (update, delete) по аналогии
