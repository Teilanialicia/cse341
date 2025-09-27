const express = require('express');
const route = express.Router();
const userController = require('../controllers/user');

// Get request for one user by id
route.get('/:id', userController.getSingleUserById);

// Get request for all users
route.get('/', userController.getAllUsers);

// Post request
route.post('/', userController.addUser);

// Put request to update user by id
route.put('/:id', userController.updateUser);

// Delete request to delete user by id
route.delete('/:id', userController.deleteUserById);


module.exports = route;