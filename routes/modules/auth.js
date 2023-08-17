// require related modules
const express = require('express')
const router = express.Router()
const passport = require('passport')

// facebook callback
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// user
router.get('/facebook',
  passport.authenticate('facebook', {
    scope: ['email', 'public_profile']
  }))

module.exports = router