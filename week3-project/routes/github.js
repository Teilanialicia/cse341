const router = require('express').Router();
const passport = require('passport');

router.get('/callback', passport.authenticate('github', {
        failureRedirect: '/api-docs', 
        session: false,
    }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);

module.exports = router;