const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/events', (req, res) => {
  const event = req.body;
  console.log("Event Received", req.body);
  
  // Send the event to the Blog Post Microservice
  axios.post('http://localhost:4000/events', event);
  console.log("Event sent to posts");  
  // Send the event to the Comments Microservice
  axios.post('http://localhost:4001/events', event);
  console.log("Event sent to comments");  
  // Send the event to the Query Service
  axios.post('http://localhost:4002/events', event);
	console.log("Event sent to query");  
  res.send({ status: 'Successful!' });
});

app.listen(4005, () => {
  console.log("Event Bus running on Port 4005");
});
