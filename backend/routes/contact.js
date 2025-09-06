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


module.exports = route;