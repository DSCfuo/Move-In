const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/', adminController.getAllAdmins)
router.post('/register', adminController.registerAdmin)
router.post('/login', adminController.logInAdmin)

module.exports = router