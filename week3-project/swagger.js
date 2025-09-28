const swaggerAutogen = require('swagger-autogen')();
const env = require("dotenv").config();

const HOST = env.HOST;
const PORT = env.PORT;

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'adoption-api-l5kj.onrender.com',
  // host: 'localhost:8080',
  schemes: ['https']
  // schemes: ['http']
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);