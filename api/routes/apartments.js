const express = require('express');
const router = express.Router();
const apartmentController = require('../controllers/apartments')

router.get('/', apartmentController.getApartments);
router.post('/', apartmentController.createApartment);
router.put('/:id', apartmentController.updateApartment);
router.delete('/:id', apartmentController.deleteApartment)

module.exports =  router;