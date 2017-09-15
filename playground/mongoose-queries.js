const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb');
const {User} = require('./../server/models/user');

// var id = '59bc416c4ad3c7a5623e804111';

// if(!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then(function(todos) {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then(function(todo) {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then(function(todo) {
//     if(!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo by Id', todo);
// }).catch(function(err) {
//     console.log(err);
// });


// User.findById
var id = '59badaaad3443493ff031dc6';

User.findById(id).then(function(user) {
    if(!user) {
        console.log('User not found.');
    } else {
        console.log('User by Id', user)
    }
})
.catch(function(err) {
    console.log(err);
});