const express = require('express');
const axios = require('axios');
const cors = require('cors');

const { randomBytes } = require('crypto'); // Added require for randomBytes	
const app = express();
const posts = {};

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors()); // Enable CORS for all incoming requests

//endpoint to create a post
app.post('/posts/create', async (req,res) =>{ 
	
	//Generate a random id
	const id = randomBytes(2).toString('hex');
	
	//Pass blogTitle through request body
	const {blogTitle}=req.body;
	
	//create the post
	posts[id]={id, blogTitle};
	
	// On creation of a new post, send the event request to event bus
  await axios.post('http://localhost:4005/events', {
    type: "BlogPostCreated",
    data: { id, blogTitle }
  });
	
	//On successfull post creation, send the same response
	res.status(201).send(posts[id]);
});

/*
//endpoint to get all the posts
app.get('/posts',(req,res) => {
	//Fetch all the available posts as response
	res.send(posts);
});*/

// Endpoint to receive events from the event bus
app.post('/events', (req, res) => {
  console.log("Event Received", req.body);
  res.send({});
});

app.listen(4000,()=>{
		console.log("Post Service running on Port 4000")
});

