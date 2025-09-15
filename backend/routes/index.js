const router = require('express').Router();

router.use('/contact', require('./contact'));
router.use('/professional', require('./professional'));
router.use('/user', require('./user'));

// Swagger/api-docs
router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    // Redirects the user to the api-docs to see what they can use
    res.redirect('/swagger/api-docs');
})

module.exports = router;