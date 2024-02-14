import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateComment from './CreateComment';
import CommentsList from './CommentsList';

function PostsList({ refresh }) {
	const [posts, setPosts] = useState({});
	
	useEffect(() => {
		const fetchPosts = async () => {
			const res = await axios.get('http://localhost:4002/posts');
			setPosts(res.data);
		};
		fetchPosts();
	}, [refresh]);
	
	const addCommentToPost = (postId, comment) => {
		setPosts(prevPosts => {
			console.log('Comment recieved in PostsList:', comment);
			// Create a new object for the posts state
			const updatedPosts = { ...prevPosts };
			
			// Create a new array for the comments of the specific post
			// Make sure we don't push to undefined by checking if comments array exists
			const updatedComments = updatedPosts[postId].comments ? [...updatedPosts[postId].comments, comment] : [comment];
			// Set the new comments array to the post
			updatedPosts[postId] = { ...updatedPosts[postId], comments: updatedComments };
			console.log('Updated posts after adding comment:', updatedPosts);
			return updatedPosts;
		});
	};
	

return (
  <div>
    {Object.values(posts).map(post => (
      <div key={post.id}>
        <h3>{post.blogTitle}</h3>
        {/* Render the CommentsList component here with comments passed as props */}
        <CommentsList comments={post.comments} />
        <CreateComment postId={post.id} onCommentCreated={(comment) => addCommentToPost(post.id, comment)} />
      </div>
    ))}
  </div>
);
	
	
}

export default PostsList;
