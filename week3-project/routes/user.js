const express = require('express');
const route = express.Router();
const userController = require('../controllers/user');
const validate = require("../utilities/user-validation");
const handleValidationErrors = require("../middleware/validate");
const { isAuthenticated } = require('../middleware/authenticate');

// Get request for one user by id
route.get('/:id', 
    isAuthenticated,
    userController.getSingleUserById
);

// Get request for all users
route.get('/',
    isAuthenticated,
    userController.getAllUsers
);

// Post request
route.post('/', 
    isAuthenticated,
    validate.userRules(),
    handleValidationErrors,
    userController.addUser
);

// Put request to update user by id
route.put('/:id', 
    isAuthenticated,
    validate.userRules(),
    handleValidationErrors,
    userController.updateUser
);

// Delete request to delete user by id
route.delete('/:id', 
    isAuthenticated,
    userController.deleteUserById
);

module.exports = route;