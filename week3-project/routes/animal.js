const express = require('express');
const route = express.Router();
const animalController = require('../controllers/animal');
const validate = require("../utilities/animal-validation");
const handleValidationErrors = require("../middleware/validate");
const { isAuthenticated } = require('../middleware/authenticate');

// Get request for one animal by id
route.get('/:id', 
    isAuthenticated,
    animalController.getSingleById
);

// Get request for all animals
route.get('/', 
    isAuthenticated,
    animalController.getAllAnimals
);

// Post request
route.post('/',
    isAuthenticated,
    validate.animalRules(),
    handleValidationErrors,
    animalController.addAnimal
);

// Put request to update animal by id
route.put('/:id', 
    isAuthenticated,
    validate.animalRules(),
    handleValidationErrors,
    animalController.updateAnimal
);

// Delete request to delete animal by id
route.delete('/:id', 
    isAuthenticated,
    animalController.deleteById
);


module.exports = route;