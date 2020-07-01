const express = require('express');
const passport = require('passport');

const router = express.Router();

// @desc  Authenticate with Google
// @route GET /auth/goggle
router.get('/goggle', passport.authenticate('google', { scope: ['profile'] }));

// @desc  Google authentication callback
// @route GET /auth/google/callback)
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }, (req, res) => {
    res.redirect('/dashboard');
  })
);

module.exports = router;
