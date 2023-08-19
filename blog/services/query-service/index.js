const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

app.use(bodyParser.json())
app.use(cors())

// variable to storing data
const posts = {}


// this endpoint tries to get collection of all the posts that we have
// and just send it back the entire posts object

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/events', (req, res) => {
    const {type, data} = req.body

    if(type === 'post-created') {
      const {id , title } = data 
      posts[id] = {id, title, comments: []}
    }
    if(type === 'comment-created') {
      const { id, content, postId } = data
      const post = posts[postId]
      post.comments.push({ id, content })
    }
    console.log('posts from query service', posts)
    res.send({})
})

app.listen(4002, () => {
    console.log('Query service running on port 4002')
})