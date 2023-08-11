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

// use body-parser
app.use(express.urlencoded({ extended: true }))

// routers
app.get('/todos/new', (req, res) => {
  res.render('new')
})

app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  Todo.findById(id)
    .then((todo) => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then((todo) => todo.deleteOne())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'desc' })
    .then(todos => res.render('index', { todos }))
    .catch(error => console.log(error))
})

// start server
app.listen(port, () => {
  console.log(`The app is running on http://localhost:${port}`)
})