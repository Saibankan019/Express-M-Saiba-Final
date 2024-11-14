const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.post('/', adminController.createAdmin);
router.get('/', adminController.getAdmins);

module.exports = router;
