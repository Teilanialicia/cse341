const User = require('../models/User.js');

// POST /users/
const addUser = async (req, res) => {
    //#swagger.tags=['Users']
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const street = req.body.address?.street;
    const city = req.body.address?.city;
    const state = req.body.address?.state;
    const zip = req.body.address?.zip;

    try {
        const newUser = new User({
            name,
            email,
            phone,
            address: {
                street,
                city,
                state,
                zip
            }
        });
        await newUser.save();
        res.json(newUser);
    } catch (err) {
        if (err.name === "ValidationError") {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({
                message: "Validation failed",
                errors
            });
        }
        res.status(500).json({ message: 'Unable to add new user', error: err });
    }
};

// GET /users/
const getAllUsers = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch users', error: err });
    }
};

// GET /users/:id
const getSingleUserById = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const user = await User.findById(req.params.id);
        if (!user) throw Error();
        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: 'That user id does not exist', error: err });
    }
};

// PUT /users/:id
const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const street = req.body.address?.street;
        const city = req.body.address?.city;
        const state = req.body.address?.state;
        const zip = req.body.address?.zip;
    try {
        const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
            name,
            email,
            phone,
            address: {
            street: address?.street,
            city: address?.city,
            state: address?.state,
            zip: address?.zip,
            },
        },
        { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    } catch (err) {
        if (err.name === "ValidationError") {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ message: "Validation failed", errors });
        }
        res.status(500).json({ message: "Error updating user", error: err });
    }
};

// DELETE /users/:id
const deleteUserById = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) throw new Error();

        return res.status(200).json({ message: `Deleted user with id: ${req.params.id}` });
    } catch (err) {
        return res.status(400).json({ message: 'No user found with that id. No delete occurred.' });
    }
};

module.exports = {
    addUser,
    getAllUsers,
    getSingleUserById,
    updateUser,
    deleteUserById,
};
