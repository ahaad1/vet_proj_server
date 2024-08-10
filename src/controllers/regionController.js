const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createRegion = async (req, res) => {
  const { name, countryId } = req.body;
  try {
    const region = await prisma.region.create({ data: { name, countryId } });
    res.status(201).json(region);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании региона' });
  }
};

exports.getRegions = async (req, res) => {
  try {
    const regions = await prisma.region.findMany();
    res.status(200).json(regions);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении регионов' });
  }
};

// Добавь остальные методы (update, delete) по аналогии
