const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: 'leon@example.com',
    password: 'abc123',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'honey@example.com',
    password: '123abc'
}];

const todos = [{
    _id: new ObjectID(),
    text: "First text todo"
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 888
}];

const populateTodos = function(done) {
    Todo.remove({}).then(function() {
        return Todo.insertMany(todos);
    }).then(function() {
        done();
    });
};

const populateUsers = function(done) {
    User.remove({}).then(function() {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(function() {
        done();
    });
};

module.exports = {todos, populateTodos, users, populateUsers};