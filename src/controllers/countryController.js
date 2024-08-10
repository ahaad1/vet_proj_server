const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createCountry = async (req, res) => {
  const { name } = req.body;
  try {
    const country = await prisma.country.create({ data: { name } });
    res.status(201).json(country);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании страны' });
  }
};

exports.getCountries = async (req, res) => {
  try {
    const countries = await prisma.country.findMany();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении стран' });
  }
};

// Добавь остальные методы (update, delete) по аналогии
