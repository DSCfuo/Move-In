const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listings');
const {imgParser} = require('../config/cloudinary.config');

router.get('/', listingController.getAllListings);
router.post('/', imgParser.single("apartmentImg"), listingController.createListing);
router.delete('/:id', listingController.removeListing);

module.exports = router;