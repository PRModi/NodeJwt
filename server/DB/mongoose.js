const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp', { useMongoClient: true }).then(() => {
    console.log('Connection to local Mongo DB server successful !');
}).catch((e) => {
    console.log(e);
});

module.exports = { mongoose };


