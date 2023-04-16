import React, { useState } from 'react';
import Login from './Components/Login.js';
import Feed from './Components/feed.js';
import Profile from './Components/Profile.js';
import './App.css';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropFileInput, setShowDropFileInput] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showFeed, setShowFeed] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleClick = () => {
    setShowDropFileInput(true);
  };
  const onFileChange = (files) => {
    console.log(files);
}
  return (
    <div className="App">
      {isLoggedIn ? (
        <>
        {showProfile ? (
          <Profile setShowProfile={setShowProfile} setShowFeed={setShowFeed} />
        ) : (
         <Feed setShowProfile={setShowProfile} setShowFeed={setShowFeed}/>
        )}
      </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
