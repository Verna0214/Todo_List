const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

// login
router.get('/login', (req, res) => {
  res.render('login')
})

// register
router.get('/register', (req, res) => {
  res.render('register')
})

// login post
router.post('/login', passport.authenticate( 'local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
  }
))

// register post
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  if (!name || !email || !password || !confirmPassword) {
    console.log('All the forms are required! ')
    return res.render('register', { name, email, password, confirmPassword })
  } else if (password !== confirmPassword) {
    console.log('confirmPassword is not correct.')
    return res.render('register', { name, email, password, confirmPassword })
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        console.log('User is already exist.')
        res.render('register', { name, email, password, confirmPassword })
      } else {
        return User.create({ name, email, password })
          .then(() => res.redirect('/'))
          .catch(error => console.log(error))
      }
    })
    .catch(error => console.log(error))
})


module.exports = router