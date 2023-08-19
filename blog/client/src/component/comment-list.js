import React, { useEffect, useState } from "react";
import axios from 'axios'

export default function CommentList ({ comments }) {
    // since updated with query event it unecessary to fetching again the comments

    // const [comments, setComments] = useState([])

    // const fetchData = () => {
    //     axios.get(`http://localhost:4001/posts/${postId}/comments`)
    //     .then(res => {
    //         setComments(res.data)
    //     })
    //     .catch(error => {
    //         console.log('error', error)
    //     })
    // }

    // useEffect(() => {
    //     fetchData()
    // },[])

    const renderComments = comments.map(comment => {
        return (
            <li key={comment.id}>
                {comment.content}
            </li>
        )
    })
    console.log('comments', comments)

    return (
        <ul>
          {renderComments}
        </ul>
    )
}