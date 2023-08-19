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
let posts = {};

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', async (req, res) => {
    console.log('')
    const id = crypto.randomBytes(4).toString('hex')
    const { title } = req.body
    posts[id] = {
        id, title
    }
    // hit an event 
    await axios.post('http://localhost:4005/events', {
        type: 'post-created',
        data: {
            id, title
        }
    })
    res.status(201).send(posts[id])
})
// event handler
// this endpoint is going to receive any event that is coming over from the event bus server
app.post('/events', (req, res) => {
    console.log('Received event from posts', req.body.type)

    res.send({})
})

app.listen(4000, () => {
    console.log('Posts server listening on port 4000')
})