const express = require('express');
const router = express.Router();
const apartmentController = require('../controllers/apartments')
const {imgParser} = require('../config/cloudinary.config');

router.get('/', apartmentController.getAllApartments);
router.get('/search', apartmentController.searchForApartment);
router.get('/:id', apartmentController.getApartmentById)
router.post('/', imgParser.single("apartmentImg"), apartmentController.createApartment);
router.post('/approve_listing', imgParser.none(), apartmentController.createApartment)
router.put('/:id', imgParser.none(), apartmentController.updateApartment);
router.delete('/:id', apartmentController.deleteApartment)

module.exports =  router;