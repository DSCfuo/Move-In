const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletter');

router.get('/', newsletterController.getAllSubscribers);
router.post('/', newsletterController.addNewSubscriber);

module.exports = router;