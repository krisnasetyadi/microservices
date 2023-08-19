const express = require("express");
const bodyParser = require("body-parser");
// to generate new id
const crypto = require("crypto");
const cors = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(cors())
// storing all created posts
let posts = {};

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', (req, res) => {
    console.log('')
    const id = crypto.randomBytes(4).toString('hex')
    const { title } = req.body
    posts[id] = {
        id, title
    }

    res.status(201).send(posts[id])
})

app.listen(4000, () => {
    console.log('Posts server listening on port 4000')
})