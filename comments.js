// create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let comments = [];
let id = 0;

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
    res.send(comments);
});

app.post('/comments', (req, res) => {
    const comment = req.body;
    comment.id = id++;
    comments.push(comment);
    res.send(comment);
});

app.listen(3000);