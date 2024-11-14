const prisma = require('../models/prismaClient');

exports.createSupplier = async (req, res) => {
  try {
    const { name, contactInfo, createdBy } = req.body;
    const supplier = await prisma.supplier.create({
      data: { name, contactInfo, createdBy },
    });
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ error: 'Error creating supplier' });
  }
};

exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await prisma.supplier.findMany({
      include: { items: true, admin: true },
    });
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching suppliers' });
  }
};
