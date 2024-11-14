const prisma = require('../models/prismaClient');

exports.createCategory = async (req, res) => {
  try {
    const { name, description, createdBy } = req.body;
    const category = await prisma.category.create({
      data: { name, description, createdBy },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error creating category' });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: { items: true, admin: true },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
};
