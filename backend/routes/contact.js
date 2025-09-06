const express = require('express');
const route = express.Router();
const contactController = require('../controllers/contact');

// Post request
route.post('/', contactController.createContact);

// Get request for all contacts
route.get('/', contactController.getAll);

// Get request for one contact
route.get('/:email', contactController.getSingle);

module.exports = route;