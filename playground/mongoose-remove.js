const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then(function(res) {
//     console.log(res);
// });

// Todo.findOneAndRemove()
// Todo.findByIdAndRemove

Todo.findOneAndRemove({_id: '59bd91374d9708ad1856a775'}).then(function(todo) {
    console.log(todo);
});

Todo.findByIdAndRemove('59bd91374d9708ad1856a775').then(function(todo) {
    console.log(todo);
});