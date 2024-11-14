const prisma = require('../models/prismaClient');

exports.createItem = async (req, res) => {
  try {
    const { name, description, price, quantity, categoryId, supplierId, createdBy } = req.body;

    // Validasi input
    if (!name || !price || !quantity || !categoryId || !supplierId || !createdBy) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const item = await prisma.item.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        quantity,
        categoryId,
        supplierId,
        createdBy,
      },
    });

    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating item' });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      include: {
        category: true,   // Relasi Category
        supplier: true,   // Relasi Supplier
        admin: true,      // Relasi Admin
      },
    });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching items' });
  }
};

exports.getLowStockItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      where: { quantity: { lt: 5 } },
      include: { category: true, supplier: true },  // Menyertakan relasi
    });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching low-stock items' });
  }
};

exports.getItemsByCategory = async (req, res) => {
  const { categoryId } = req.params;

  if (!categoryId || isNaN(categoryId)) {
    return res.status(400).json({ error: 'Invalid categoryId' });
  }

  try {
    const items = await prisma.item.findMany({
      where: { categoryId: parseInt(categoryId) },
      include: { category: true, supplier: true, admin: true },
    });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching items by category' });
  }
};

exports.getCategorySummary = async (req, res) => {
  try {
    const summary = await prisma.item.groupBy({
      by: ['categoryId'],
      _sum: { price: true, quantity: true },
      _avg: { price: true },
      _count: { id: true },
    });

    res.json(summary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching category summary' });
  }
};

exports.getSupplierSummary = async (req, res) => {
  try {
    const summary = await prisma.item.groupBy({
      by: ['supplierId'],
      _sum: { price: true, quantity: true },
      _avg: { price: true },
      _count: { id: true },
    });

    res.json(summary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching supplier summary' });
  }
};

exports.getSystemSummary = async (req, res) => {
  try {
    const [totalItems, totalCategories, totalSuppliers] = await Promise.all([
      prisma.item.count(),
      prisma.category.count(),
      prisma.supplier.count(),
    ]);

    const totalStockValue = await prisma.item.aggregate({
      _sum: { price: true },
    });

    res.json({
      totalItems,
      totalCategories,
      totalSuppliers,
      totalStockValue: totalStockValue._sum.price,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching system summary' });
  }
};

exports.getStockSummary = async (req, res) => {
  try {
    const summary = await prisma.item.aggregate({
      _sum: { quantity: true, price: true },
      _avg: { price: true },
    });

    const totalStock = summary._sum.quantity || 0;
    const totalValue = summary._sum.quantity * summary._avg.price || 0;
    const averagePrice = summary._avg.price || 0;

    res.status(200).json({ totalStock, totalValue, averagePrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching stock summary' });
  }
};
