// require related modules
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const router = require('./routes')
require('./config/mongoose')

const port = process.env.PORT || 3000
const app = express()

// set template engine
app.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')

// use body-parser
app.use(express.urlencoded({ extended: true }))
// use method-override
app.use(methodOverride('_method'))

// routers
app.use(router)

// start server
app.listen(port, () => {
  console.log(`The app is running on http://localhost:${port}`)
})