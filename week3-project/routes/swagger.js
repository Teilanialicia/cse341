const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

//#swagger.tags=['Swagger']
router.use('/api-docs', swaggerUi.serve);

//#swagger.tags=['Swagger']
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;