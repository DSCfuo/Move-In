const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact');

router.post('/', contactController.sendMail);

module.exports = router;