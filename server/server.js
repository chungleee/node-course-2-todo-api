var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');

var app = express();

app.use(bodyParser.json());

app.post('/todos', function(req, res) {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then(function(doc) {
        res.send(doc);
    }, function(err) {
        res.status(400).send(err);
    });
});

app.get('/todos', function(req, res) {
    Todo.find().then(function(todos) {
        res.send({todos})
    }, function(err) {
        res.status(400).send(err);
    });
});

// GET /todos/:id
app.get('/todos/:id', function(req, res) {
    var id = req.params.id;
    
    // validate id using isValid
        // if not valid 404 - send back empty send
    if(!ObjectID.isValid(id)) {
        // return res.sendStatus(404);
        return res.status(404).send();
    };

    // findById
    Todo.findById(id).then(function(todo) {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch(function(err) {
        res.status(400).send();
    });
});



// ***SERVER***
app.listen(3000, function() {
    console.log('-----Started on port 3000-----');
});

module.exports = {app};