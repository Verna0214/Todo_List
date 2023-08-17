// require related modules
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
// 判斷執行環境載入 dotenv 環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const router = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')

const PORT = process.env.PORT
const app = express()

// set template engine
app.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')
// use express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// use body-parser
app.use(express.urlencoded({ extended: true }))
// use method-override
app.use(methodOverride('_method'))
// use passport
usePassport(app)
// use connect-flash
app.use(flash())
// set res.locals
app.use((req, res, next) => {
  res.locals.isLogin = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
// routers
app.use(router)

// start server
app.listen(PORT, () => {
  console.log(`The app is running on http://localhost:${PORT}`)
})