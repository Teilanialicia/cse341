/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const env = require("dotenv").config();
const app = express();
const connectDb = require("./models/connection");

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;
const connectionString = process.env.DB_CONNECTION_STRING;

/* ***********************
 * Database
 *************************/
connectDb(connectionString);


/* ***********************
 * Express Setup
 *************************/
app.use(express.json({ extended: false }));

/* ***********************
 * Routes
 *************************/
//      API url path              Route code to use
app.use('/api/userModel', require('./api/user'));


/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
})
