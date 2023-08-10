const mongoose = require('mongoose')
const Todo = require('../todo')

// 判斷執行環境載入 dotenv 環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

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

  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` })
  }

  console.log('done!')
})