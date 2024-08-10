const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createDistrict = async (req, res) => {
  const { name, cityId } = req.body;
  try {
    const district = await prisma.district.create({ data: { name, cityId } });
    res.status(201).json(district);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании района' });
  }
};

exports.getDistricts = async (req, res) => {
  try {
    const districts = await prisma.district.findMany();
    res.status(200).json(districts);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении районов' });
  }
};

// Добавь остальные методы (update, delete) по аналогии
