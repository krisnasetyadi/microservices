const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

// storing events as data store
const events = []

app.post('/events', (req, res) => {
    const event = req.body
    events.push(event)
    console.log('event', event)
    // post service  event
    // axios.post('http://localhost:4000/events', event)
    axios.post('http://localhost:4000/events', event).catch((err) => {
        console.log(err.message);
      });
     // comment service  event
    // axios.post('http://localhost:4001/events', event)
    axios.post('http://localhost:4001/events', event).catch((err) => {
        console.log(err.message);
      });
    //  query service event
    // axios.post('http://localhost:4002/events', event)
    axios.post('http://localhost:4002/events', event).catch((err) => {
        console.log(err.message);
      });
    // moderation service
    // axios.post('http://localhost:4003/events', event)
    axios.post("http://localhost:4003/events", event).catch((err) => {
    console.log(err.message);
  });
    res.send({ status: 'OK' })
})

app.get('/events', (req, res) => {
    res.send(events)
})

app.listen(4005, () => {
    console.log('Event Bus running on 4005')
})