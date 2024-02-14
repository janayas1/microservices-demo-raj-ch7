const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS for all requests

const posts = {}; // To store the post and comments data

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
   console.log('event  received',  req.body);
  if (type === 'BlogPostCreated') {
    const { id, blogTitle } = data;
    posts[id] = { id, blogTitle, comments: [] };
	 console.log('Posts  after  Blog Post  created: ',posts);
  }

  if (type === 'CommentCreated') {
	console.log('data: ',data);
    const { id, content, postId } = data;
	 console.log('Posts: ',posts);
    const post = posts[postId];
	 console.log('Post: ',post);
    post.comments.push({ id, content });
	 console.log('post  updated: ',post);
  }

  console.log(JSON.stringify(posts, null, 2));
  res.send({});
});

app.listen(4002, () => {
  console.log('Query Service running on Port 4002');
});
