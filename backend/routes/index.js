const router = require('express').Router();

router.use('/contact', require('./contact'));
router.use('/professional', require('./professional'));
router.use('/user', require('./user'));

// Swagger/api-docs
router.use('/', require('./swagger'));

module.exports = router;