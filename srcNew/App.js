import React, { useState } from 'react';
import CreatePost from './CreatePost';
import PostsList from './PostsList';

function App() {
	
  // Define the state and the callback function here
  const [refresh, setRefresh] = useState(false);

  const onPostCreated = () => {
    setRefresh((prev) => !prev); // This toggles the refresh state
  };

  return (
    <div className="App">
	 <h1>Create Post</h1>
      <CreatePost onPostCreated={onPostCreated} />
      <h1>Posts</h1>
      <PostsList refresh={refresh} />
    </div>
  );
}


export default App;
