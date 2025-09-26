const Animal = require('../models/Animal.js');

// Post /animals/
const addAnimal = async (req, res) => {
    //#swagger.tags=['Adoption']

    // Attempt to add the animal
    try {
        const newAnimal = new Animal(req.body);
        await newAnimal.save();
        res.json(newAnimal);
    } catch (err) {
        if (err.name === "ValidationError"){
            // collect all validation messages into an array
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({
                message: "Validation failed",
                errors
            });
        }
        res.status(500).json({message: 'Unable to add new animal', error: err});
    }
}

// Get all /animals/
const getAllAnimals = async (req, res) => {
    //#swagger.tags=['Adoption']
    try {
        const contacts = await Animal.find({});
        res.status(200).json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Failed to fetch animals', error: err});
    }
}

// Get single /animals/:id
const getSingleById = async (req, res) => {
    //#swagger.tags=['Adoption']
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal)
            throw Error()
        res.status(200).json({animal});
    } catch (err) {
        res.status(500).json({message: 'That animal id does not exist', error: err});
    }
}

// PUT /animals/:id
const updateAnimal = async (req, res) => {
//#swagger.tags=['Adoption']
    try {
        const updatedAnimal = await Animal.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
        );

        if (!updatedAnimal) {
        return res.status(404).json({ message: "Animal not found" });
        }

        res.json(updatedAnimal);
    } catch (err) {
        if (err.name === "ValidationError") {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ message: "Validation failed", errors });
        }
    }
};

// Delete
const deleteById = async (req, res) => {
    //#swagger.tags=['Adoption']
    try {
        const animal = await Animal.findByIdAndDelete(req.params.id);
        
        if (!animal)
            throw new Error();

        return res.status(200).json({error: `Deleted animal with id: ${req.params.id}`});
    } catch (err) {
        return res.status(400).json({message: 'No animal found with that id. No delete occurred.'});
    }
}

module.exports = {
    getAllAnimals,
    getSingleById,
    addAnimal,
    updateAnimal,
    deleteById,
}