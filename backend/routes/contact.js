const express = require('express');
const route = express.Router();
const contactController = require('../controllers/contact');

// Post request
route.post('/', contactController.createContact);

// Get request for all contacts
route.get('/', contactController.getAll);

// Get request for one contact by email
route.get('/email/:email', contactController.getSingleByEmail);

// Get request for one contact by id
route.get('/id/:id', contactController.getSingleById);

// Put request to update contact by email
route.put('/email/', contactController.updateByEmail);

// Put request to update contact by id
route.put('/id/', contactController.updateById);

// Delete request to delete contact by email
route.delete('/email/', contactController.deleteByEmail);

// Delete request to delete contact by id
route.delete('/id/', contactController.deleteById);


module.exports = route;