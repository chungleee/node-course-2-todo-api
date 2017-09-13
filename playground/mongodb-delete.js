// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', function(err, db){
    if(err){
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server');

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then(function(result) {
    //     console.log(result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then(function(result) {
    //     console.log(result);
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then(function(result) {
    //     console.log(result);
    // });

    // delete duplicates
    // db.collection('Users').deleteMany({name: 'Leon'}).then(function(results) {
    //     console.log(results);
    // });

    // delete by ID
    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('59b9830896f97d805a58fbe0')
    }).then(function(results) {
        console.log(results);
        console.log(JSON.stringify(results, undefined, 2));
    });

    // db.close();
});