const express = require('express');
const router = express.Router();
const apartmentController = require('../controllers/apartments')

router.get('/', apartmentController.getAllApartments);
router.get('/search', apartmentController.searchForApartment);
router.get('/:id', apartmentController.getApartmentById)
router.post('/', apartmentController.createApartment);
router.put('/:id', apartmentController.updateApartment);
router.delete('/:id', apartmentController.deleteApartment)

module.exports =  router;