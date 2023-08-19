const express = require("express");
const bodyParser = require("body-parser");
// to generate new id
const crypto = require("crypto");

const app = express();
app.use(bodyParser.json());
// storing all created posts
const commentsByPostId = {};



app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', (req, res) => {
    const commentId = crypto.randomBytes(4).toString('hex')
    const { content } = req.body
    const comments = commentsByPostId[req.params.id] || []
    comments.push({id: commentId, content})
    commentsByPostId[req.params.id] = comments
    res.status(201).send(comments)
})

app.listen(4001, () => {
    console.log('Comments server listening on port 4001')
})