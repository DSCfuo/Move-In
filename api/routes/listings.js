const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listings');

router.get('/', listingController.getAllListings);
router.post('/', listingController.createListing);
router.delete('/:id', listingController.removeListing);

module.exports = router;