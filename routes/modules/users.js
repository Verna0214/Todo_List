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
  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push('所有欄位均必填！')
  }
  if (password !== confirmPassword) {
    errors.push('密碼與確認密碼不相符！')
  }
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        errors.push('使用者信箱曾已註冊！')
        return res.render('register', { errors, name, email, password, confirmPassword })
      }
      
      return User.create({ name, email, password })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error)) 
    })
    .catch(error => console.log(error))
})

router.get('/logout', (req, res) => {
  req.logout(() => {
    req.flash('success_msg', '已成功登出！')
    res.redirect('/users/login')
  })
})


module.exports = router