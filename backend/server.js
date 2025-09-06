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
const connectDb = require("./routes/data/database");
const cors = require('cors');


/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;

/* ***********************
 * Database
 *************************/
connectDb();


/* ***********************
 * Express Setup
 *************************/
app.use(express.json({ extended: false }));
app.use(cors());

/* ***********************
 * Routes
 *************************/
app.use('/', require('./routes'));


/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
})
