import React, { useState } from 'react';
import axios from 'axios';

function CreatePost({ onPostCreated }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await axios.post('http://localhost:4000/posts/create', { blogTitle: title });
    onPostCreated(); // This will be called after the post is successfully created
	  setTitle('');
  } catch (error) {
    console.error("Error creating post:", error);
  }
 
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreatePost;
