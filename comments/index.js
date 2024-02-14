const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { randomBytes } = require('crypto');
const app = express();

app.use(express.json());
app.use(cors()); // This enables CORS for all routes and origins

// This object will store the comments in memory indexed by post ID
const commentsByPostId = {};

// Endpoint to create a comment on a given blog post
app.post('/posts/:id/comments', async  (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const { id: postId } = req.params;

  const comments = commentsByPostId[postId] || [];
  comments.push({ id: commentId, content });

  commentsByPostId[postId] = comments;
  
  // Emit an event to the event bus
  await axios.post('http://localhost:4005/events', {
    type: "CommentCreated",
    data: { id: commentId, content, postId }
  });

  //res.status(201).send(comments);
  res.status(201).send({ id: commentId, content });
});


// Endpoint to retrieve all comments for a given blog post
app.get('/posts/:id/comments', (req, res) => {
  const { id: postId } = req.params;
  const comments = commentsByPostId[postId] || [];

  res.status(200).send(comments);
});

// Endpoint to receive events from the event bus
app.post('/events', (req, res) => {
  console.log("Event Received", req.body);
  res.send({});
});

app.listen(4001, () => {
  console.log(`Comments Service running on Port 4001`);
});
