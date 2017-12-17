const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { mongoose } = require('./DB/mongoose');


const { User } = require('./model/user');
const { authenticate } = require('./authenticate/authenticate')

let app = express();
app.use(bodyParser.json());


//get all Users
app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send({ users });
    }).catch((e) => {
        res.send(e);
    });
});

//add a new user
app.post('/user', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();

    }, (e) => {
        res.status(400).send(e);

    }).then((token) => {
        res.header('x-auth', token).send(user);
    }, (e) => {
        res.status(400).send(e);

    }).catch((e) => {
        res.status(404).send(e);
    })
});

//get specific user Data
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.listen(3000, () => {
    console.log('Node server running on port 3000');
});