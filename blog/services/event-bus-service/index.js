const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

app.post('/events', (req, res) => {
    const event = req.body
    console.log('event', event)
    // post service  event
    axios.post('http://localhost:4000/events', event)
     // comment service  event
    axios.post('http://localhost:4001/events', event)
    //  query service event
    axios.post('http://localhost:4002/events', event)
    // moderation service
    axios.post('http://localhost:4003/events', event)
    res.send({ status: 'OK' })
})

app.listen(4005, () => {
    console.log('Event Bus running on 4005')
})