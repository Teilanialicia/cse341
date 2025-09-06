const mongoose = require('mongoose');

const connectDb = async () => {
    const connectionString = process.env.DB_CONNECTION_STRING;
    await mongoose.connect(connectionString);
    console.log("Db connected!");
};

module.exports = connectDb;