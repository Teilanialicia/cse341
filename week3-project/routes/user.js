const express = require('express');
const route = express.Router();
const userController = require('../controllers/user');
const validate = require("../utilities/user-validation");
const handleValidationErrors = require("../middleware/validate");

// Get request for one user by id
route.get('/:id', userController.getSingleUserById);

// Get request for all users
route.get('/', userController.getAllUsers);

// Post request
route.post('/', 
    validate.userRules(),
    handleValidationErrors,
    userController.addUser
);

// Put request to update user by id
route.put('/:id', 
    validate.userRules(),
    handleValidationErrors,
    userController.updateUser
);

// Delete request to delete user by id
route.delete('/:id', userController.deleteUserById);

module.exports = route;