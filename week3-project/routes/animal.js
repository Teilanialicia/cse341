const express = require('express');
const route = express.Router();
const animalController = require('../controllers/animal');

// Get request for one animal by id
route.get('/:id', animalController.getSingleById);

// Get request for all animals
route.get('/', animalController.getAllAnimals);

// Post request
route.post('/', animalController.addAnimal);

// Put request to update animal by id
route.put('/:id', animalController.updateAnimal);

// Delete request to delete animal by id
route.delete('/:id', animalController.deleteById);


module.exports = route;