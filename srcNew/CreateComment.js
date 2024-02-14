import React, { useState } from 'react';
import axios from 'axios';

function CreateComment({ postId, onCommentCreated }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
	 try {
    const { data } = await axios.post(`http://localhost:4001/posts/${postId}/comments`, { content });
    setContent('');
    if (onCommentCreated) {
	    console.log('DAta on CreateComment:', data);
      onCommentCreated(data); // Only call if onCommentCreated is provided
		//onCommentCreated({ id: data.id, content }); // Assuming the response is the new comment
    }
  } catch (error) {
    console.error("Error submitting comment:", error);
  }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Comment"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateComment;
