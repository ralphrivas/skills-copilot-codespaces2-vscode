//Create Web Server with Express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var comments = require('./comments.json');
var path = require('path');
var port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//Get all comments
app.get('/comments', function(req, res) {
  res.json(comments);
});
//Get comment by id
app.get('/comments/:id', function(req, res) {
  var id = req.params.id;
  var comment = comments.filter(function(comment) {
    return comment.id == id;
  });
  res.json(comment[0]);
});
//Post a comment
app.post('/comments', function(req, res) {
  var comment = req.body;
  comments.push(comment);
  fs.writeFile('./comments.json', JSON.stringify(comments, null, 4), function(err) {
    console.log(err);
  });
  res.json(comments);
});
//Delete a comment
app.delete('/comments/:id', function(req, res) {
  var id = req.params.id;
  comments = comments.filter(function(comment) {
    return comment.id != id;
  });
  fs.writeFile('./comments.json', JSON.stringify(comments, null, 4), function(err) {
    console.log(err);
  });
  res.json(comments);
});
//Update a comment
app.put('/comments/:id', function(req, res) {
  var id = req.params.id;
  var newComment = req.body;
  comments = comments.map(function(comment) {
    return comment.id == id ? newComment : comment;
  });
  fs.writeFile('./comments.json', JSON.stringify(comments, null, 4), function(err) {
    console.log(err);
  });
  res.json(comments);
});
app.listen(port, function() {
  console.log('Server is running on port ' + port);
});


