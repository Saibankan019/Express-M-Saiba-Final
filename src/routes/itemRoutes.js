const express = require('express');
const itemController = require('../controllers/itemController');
const router = express.Router();

// CRUD Routes untuk Item
router.post('/', itemController.createItem);
router.get('/', itemController.getItems);
router.get('/low-stock', itemController.getLowStockItems);

// Summary routes untuk laporan
router.get('/category/:categoryId', itemController.getItemsByCategory);
router.get('/summary/category', itemController.getCategorySummary);
router.get('/summary/supplier', itemController.getSupplierSummary);
router.get('/summary/system', itemController.getSystemSummary);
router.get('/summary/stock', itemController.getStockSummary);

module.exports = router;
