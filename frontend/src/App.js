import React, { useState } from 'react';
import Login from './Components/Login.js';
import Feed from './Components/feed.js';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <Feed />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
