import React from 'react'
import PostCreateScreen from './component/post-create'
import PostListScreen from './component/post-list'

export default function App () {
  return (
    <div className='container'>
      <h1>Create Post</h1>
      <PostCreateScreen />
      <hr />
      <h1>Post List</h1>
      <PostListScreen/>
    </div>
  )
}