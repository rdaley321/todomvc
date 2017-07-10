const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Todo = require('./models/Todo')

app.use('/static', express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/todomvc');

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/static/index.html");
})

app.get('/api/todos', function(req, res) {
  Todo.find().sort('order').then(function(todos) {
    res.json(todos)
  }).catch(function(err) {
    res.status(422).json(err)
  })
})

app.post('/api/todos', function(req, res) {
  console.log(req.body);
  const todo = new Todo()
  todo.title = req.body.title
  todo.order = req.body.order
  todo.completed = req.body.completed
  todo.save().then(function(todo) {
    res.json(todo)
  }).catch(function(err) {
    res.status(422).json(err)
  })
})

app.get('/api/todos/:id', function(req, res) {
  Todo.findOne({_id: req.params.id}).then(function(todo) {
    res.json(todo)
  }).catch(function(err) {
    res.status(422).json(err)
  })
})

app.put('/api/todos/:id', function(req, res) {
  Todo.findOne({_id: req.params.id}).then(function(todo) {
    todo.title = req.body.title
    todo.order = req.body.order
    todo.completed = req.body.completed
    todo.save().then(function(todo) {
      res.json(todo)
    }).catch(function(err) {
      res.status(422).json(err)
    })
  })
})

app.patch('/api/todos/:id', function(req, res) {
  Todo.findOne({_id: req.params.id}).then(function(todo) {
    todo.title = req.body.title
    todo.order = req.body.order
    todo.completed = req.body.completed
    todo.save().then(function(todo) {
      res.json(todo)
    }).catch(function(err) {
      res.status(422).json(err)
    })
  })
})

app.delete('/api/todos/:id', function(req, res) {
  Todo.deleteOne({_id: req.params.id}).then(function(todo) {
    res.json(todo)
  }).catch(function(err) {
    res.status(422).json(err)
  })
})

app.listen(3000, function() {
  console.log('Express running on http://localhost:3000/.')
})
