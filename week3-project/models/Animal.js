const mongoose = require('mongoose');

const animal = new mongoose.Schema({
    // Required
    name: {
        type: String,
        required: [true, "Animal name is required"],
        trim: true
    },
    species: {
        type: String,
        required: true,
        enum: ["dog", "cat", "rabbit", "shrimp", "bird", "fish", "other"]
    },
    status: {
        type: String,
        enum: ["available", "pending", "adopted"],
        default: "available",
        required: true
    },
    // Not required
    age: {
        type: Number,
        min: [0, "Age cannot be negative"]
    },
    breed: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["male", "female", "unknown"],
        default: "unknown"
    },
    birthday:{
        type:Date
    },
    description:{
        type:String
    },
    weight:{
        type:Number
    },
    color:{
        type:String
    },
    vaccinations:{
        type:[String]
    },
    spayedNeutered:{
        type:Boolean
    },
    goodWith:{
        type:{
            children: Boolean,
            dogs: Boolean,
            cats: Boolean
        }
    },
    specialNeeds:{
        type:String
    }
})

module.exports = Animal = mongoose.model('animal', animal);