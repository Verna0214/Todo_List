const mongoose = require('mongoose')

// 判斷執行環境載入 dotenv 環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// set mongodb connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:3000/todo_list'
mongoose.connect(MONGODB_URI)
const db = mongoose.connection
// 判斷連線錯誤
db.on('error', () => {
  console.log('mongodb error!')
})
// 判斷連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db