const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.post('/events', async (req, res) => {
    const { type, data } = req.body
    console.log('moderation data type', [data, type])
    if (type === 'comment-created'){
        const status = data.content.includes('orange') ? 'rejected' : 'approved'
        
        await axios.post('http://localhost:4005/events', {
            type: 'comment-moderated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        })
        
        res.status({})
    }
})

app.listen(4003, () => {
    console.log('Moderation running on port 4003')
})