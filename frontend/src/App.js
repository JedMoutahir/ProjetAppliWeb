import React, { useState } from 'react';
import Login from './Components/Login.js';
import Feed from './Components/feed.js';
import Profile from './Components/Profile.js';
import SavedPosts from './Components/SavedPost.js';

import './App.css';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showFeed, setShowFeed] = useState(false);
  const [showSavedPosts, setShowSavedPosts] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
 


  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          {showSavedPosts ? (
            <SavedPosts setShowProfile={setShowProfile} setShowFeed={setShowFeed} setShowSavedPosts={setShowSavedPosts} />
          ) : (
            showFeed ? (
              <Feed setShowProfile={setShowProfile} setShowFeed={setShowFeed} setShowSavedPosts={setShowSavedPosts}/>
            ) : (
              showProfile ? (
                <Profile setShowProfile={setShowProfile} setShowFeed={setShowFeed} setShowSavedPosts={setShowSavedPosts}/>
              ) : (
                <Feed setShowProfile={setShowProfile} setShowFeed={setShowFeed} setShowSavedPosts={setShowSavedPosts} />    
              )
            )
          )}
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
