const router = require('express').Router();

router.use('/animals', require('./animal'));
router.use('/user', require('./user'));

// Swagger/api-docs
router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    // Redirects the user to the api-docs to see what they can use
    res.redirect('/api-docs');
})

module.exports = router;