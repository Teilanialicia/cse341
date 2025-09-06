const mongoose = require('mongoose');

const connectDb = async (connectionString) => {
    await mongoose.connect(connectionString);
    console.log("Db connected!");
};

module.exports = connectDb;