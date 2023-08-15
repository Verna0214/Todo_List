const express = require('express')
const router = express.Router()
const User = require('../../models/user')

// login
router.get('/login', (req, res) => {
  res.render('login')
})

// register
router.get('/register', (req, res) => {
  res.render('register')
})

// login post
router.post('/login', (req, res) => {
})

// register post
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  if (password !== confirmPassword) {
    console.log('confirmPassword is not correct.')
    return res.redirect('/')
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