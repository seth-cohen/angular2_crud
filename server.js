/*
 * Seth Cohen <seth.h.cohen@gmail.com>
 */

var express = require('express');
var path = require('path');
var db = require('./db');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/**
 * All these routes should serve index.html - and we will let Angulars routing do the rest
 */
app.get('/:var(update*|create*|list*|delete*)?', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

/**
 * API route for retrieving a single user resource
 */
app.get('/user/:id', function (req, res) {
  db.getUser(req.params.id, function(data) {
    res.send(data);
  });
});

/**
 * API route for deleting a single user resource
 */
app.delete('/user/:id', function (req, res) {
  db.deleteUser(req.params.id, function(data) {
    res.send(data);
  });
});

/**
 * API route to create a single user resource
 */
app.post('/user', function (req, res) {
  db.createUser(req.body, function(data) {
    res.send(data);
  });
});

/**
 * API route to update a single user resource
 */
app.put('/user', function (req, res) {
  console.log('update', req.body);
  db.updateUser(req.body, function(data) {
    res.send(data);
  });
});

/**
 * API route to retrieve all user resources
 */
app.get('/users', function (req, res) {
  db.getUsers(function(data) {
    res.send(data);
  });
});

/**
 * Serve our static js files - as requested by RequireJS
 */
app.use('/libs', express.static(path.join(__dirname, 'node_modules')));
app.use('/app', express.static(path.join(__dirname, 'app')));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

