const mongoose = require('mongoose')

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

module.exports = db