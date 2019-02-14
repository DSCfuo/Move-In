const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews');

router.get('/', reviewsController.getAllReviews);
router.post('/', reviewsController.addNewReview);

module.exports = router;