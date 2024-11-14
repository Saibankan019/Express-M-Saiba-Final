const express = require('express');
const itemRoutes = require('./routes/itemRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Middleware to test database connection on app startup with retry logic
async function testDatabaseConnection() {
  const maxRetries = 5;
  let attempt = 1;

  while (attempt <= maxRetries) {
    try {
      await prisma.$connect();
      console.log("Connected to the database");
      return;  // Berhasil terhubung, keluar dari fungsi
    } catch (error) {
      console.error(`Error connecting to the database (attempt ${attempt}):`, error);
      attempt++;
      if (attempt > maxRetries) {
        console.error("Could not connect to the database after multiple attempts. Exiting...");
        process.exit(1); // Keluar dari proses jika gagal setelah beberapa kali percobaan
      }
      // Tunggu 5 detik sebelum mencoba lagi
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

testDatabaseConnection();

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/admins', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Close Prisma connection on server shutdown
process.on('SIGINT', async () => {
  console.log("Closing Prisma connection");
  await prisma.$disconnect();
  process.exit(0);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
