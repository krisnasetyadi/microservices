const express = require("express");
const bodyParser = require("body-parser");
// to generate new id
const crypto = require("crypto");
const cors = require('cors')
const axios = require('axios')
const app = express();

app.use(bodyParser.json());
app.use(cors())

// storing all created posts
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = crypto.randomBytes(4).toString('hex')
    const { content } = req.body
    const comments = commentsByPostId[req.params.id] || []
    comments.push({ id: commentId, content })
    commentsByPostId[req.params.id] = comments

    await axios.post('http://localhost:4005/events', {
        type: 'comment-created',
        data: { id: commentId, content, postId: req.params.id }
    })

    res.status(201).send(comments)
})

app.listen(4001, () => {
    console.log('Comments server listening on port 4001')
})