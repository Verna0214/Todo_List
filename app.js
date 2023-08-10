// require related modules
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

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

// routers
app.get('/', (req, res) => {
  res.send(`The app is running on http://localhost:${port}`)
})

// start server
app.listen(port, () => {
  console.log(`The app is running on http://localhost:${port}`)
})