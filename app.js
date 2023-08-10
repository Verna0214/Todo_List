// require related modules
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Todo = require('./models/todo')

// 判斷執行環境載入 dotenv 環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = process.env.PORT || 3000

// set mongodb connection
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
// 判斷連線錯誤
db.on('error', () => {
  console.log('mongodb error!')
})
// 判斷連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// set template engine
app.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')

// routers
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.log(error))
})

// start server
app.listen(port, () => {
  console.log(`The app is running on http://localhost:${port}`)
})