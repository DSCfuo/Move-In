const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listings');

router.get('/', listingController.getAllListings);
router.post('/', listingController.createListing);

module.exports = router;