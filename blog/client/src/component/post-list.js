import React, { useEffect, useState } from "react"
import axios from 'axios'
import CommentCreateScreen from "./comment-create"
import CommentList from "./comment-list"

export default function PostListScreen() {
    const [posts, setPosts] = useState({})

    const fetchData = () => {
      axios.get('http://localhost:4000/posts')
      .then(response => {
        setPosts(response.data)
      })
      .catch(error => {
        console.log('error', error)
      })
    }

    useEffect(() => {
        fetchData()
    },[])
    console.log('Object.values(posts)', Object.values(posts))
    console.log('posts', posts)
    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div 
              className="card" 
              style={{ width: '30%', marginBottom: '20px' }}
              key={post.id}
            >
              <div className="card-body">
                <h3>{post.title}</h3>
                <CommentList postId={post.id} />
                <CommentCreateScreen postId={post.id} />
              </div>

            </div>
        )
    })
    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>
    )
}