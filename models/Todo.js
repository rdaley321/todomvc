const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  title: {type: String, required: true},
  order: {type: Number, required: true},
  completed: {type: Boolean, required: true}
})
const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
