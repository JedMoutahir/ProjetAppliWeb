import React, { useState } from 'react';
import Login from './Components/Login.js';
import Feed from './Components/feed.js';
import DropFileInput from './Components/drop_file.js';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropFileInput, setShowDropFileInput] = useState(false);

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
          <Feed/>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
