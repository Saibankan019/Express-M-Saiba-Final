const prisma = require('../models/prismaClient');

exports.createAdmin = async (req, res) => {
  try {
    const admin = await prisma.admin.create({ data: req.body });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Error creating admin' });
  }
};

exports.getAdmins = async (req, res) => {
  try {
    const admins = await prisma.admin.findMany();
    res.json(admins);
  } catch (error) {
    res.status(500).json( error );
  }
};
