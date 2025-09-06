const router = require('express').Router();

router.use('/contact', require('./contact'));
router.use('/professional', require('./professional'));
router.use('/user', require('./user'));

module.exports = router;