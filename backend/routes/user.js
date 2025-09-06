const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User.js');
const route = express.Router();

// Post request
route.post('/', async(req, res) => {

    const {firstName, lastName, email} = req.body;

    // Validate the body
    if (!firstName || !lastName || !email) {
        return res.status(400).json({ error: 'First name, last name, and email are required' });
    }

    // Validate the email to make sure its an email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Set up the user "template" object
    let user = {};
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email.toLowerCase();

    const existingUser = await User.findOne({ email:user.email });
    // Check if a user with that email already exists
    if (existingUser)
        return res.status(400).json({error: 'A user with this email already exists'});

    // Attempt to add the user
    try {
        let userModel = new User(user);
        await userModel.save();
        res.json(userModel);
    } catch (err) {
        res.status(500).json({error: 'Unable to add new user'});
    }
});


// Get request
route.get('/', async(req, res) => {
    try {
        // Get and return all users
        const allUsers = await User.find({});
        res.status(200).json(allUsers);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

module.exports = route;