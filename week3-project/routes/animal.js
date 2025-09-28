const express = require('express');
const route = express.Router();
const animalController = require('../controllers/animal');
const validate = require("../utilities/animal-validation");
const handleValidationErrors = require("../middleware/validate");

// Get request for one animal by id
route.get('/:id', animalController.getSingleById);

// Get request for all animals
route.get('/', animalController.getAllAnimals);

// Post request
route.post('/', 
    validate.animalRules(),
    handleValidationErrors,
    animalController.addAnimal
);

// Put request to update animal by id
route.put('/:id', 
    validate.animalRules(),
    handleValidationErrors,
    animalController.updateAnimal
);

// Delete request to delete animal by id
route.delete('/:id', animalController.deleteById);


module.exports = route;