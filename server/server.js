var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// *****ROUTES*****

// POST /todos
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

// GET /todos
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

// DELETE
app.delete('/todos/:id', function(req, res) {
    // get the id
    var id = req.params.id;
    // validate the id - if not valid, send 404
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    };
    // remove todo by id
    Todo.findByIdAndRemove(id).then(function(todo) {
        // sucess
        // if no doc, send 404
        if(!todo) {
            return res.status(404).send();
        }
        // if doc, send doc back with 200
        res.status(200).send({todo});
    }).catch(function(err) {
        // error
        // 404 with empty body
        res.status(400).send();
    });
});

// PATCH
app.patch('/todos/:id', function(req, res) {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    };

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then(function(todo) {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch(function(err) {
        res.status(400).send();
    });
});



// ***SERVER***
app.listen(port, function() {
    console.log(`Started up at port ${port}`);
});

module.exports = {app};