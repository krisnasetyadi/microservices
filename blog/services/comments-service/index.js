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
    comments.push({ id: commentId, content, status: 'pending' })
    commentsByPostId[req.params.id] = comments

    console.log(' { id: commentId, content, postId: req.params.id }',  { id: commentId, content, postId: req.params.id })

    await axios.post('http://localhost:4005/events', {
        type: 'comment-created',
        data: { id: commentId, content, postId: req.params.id, status: 'pending' }
    })

    res.status(201).send(comments)
})

app.post('/events', async (req, res) => {
    const { type, data } = req.body
    console.log('Received event from comment', [type, data])
    if(type === 'comment-moderated') {
        const { postId, id, status, content } = data
        // get comments by postid
        const comments = commentsByPostId[postId]
        // iterate comment and find the appropriate comment
        const comment = comments.find(comment => {
            return comment.id === id
        })
        // updated status to be the status that just pulled
        comment.status = status

        await axios.post('http://localhost:4005/events', {
            type: 'comment-updated',
            data: {
                id,
                status,
                postId,
                content
            }
        })
    }
    res.send({})
})

app.listen(4001, () => {
    console.log('Comments server listening on port 4001')
})