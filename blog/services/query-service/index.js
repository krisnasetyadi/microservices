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
    console.log('tpye and data query', [type, data, posts])
    if(type === 'post-created') {
      const {id , title } = data 
      posts[id] = {id, title, comments: []}
    }
    if(type === 'comment-created') {
      const { id, content, postId, status } = data
      const post = posts[postId]
      // add a status props
      post.comments.push({ id, content, status })
    }
    if(type === 'comment-updated') {
      const { id, content, postId, status } = data

      const post = posts[postId]
      const comment = post.comments.find(comment => {
        return comment.id === id
      })
      comment.status = status
      comment.content = content
    }
    console.log('posts from query service', posts)
    res.send({})
})

app.listen(4002, () => {
    console.log('Query service running on port 4002')
})