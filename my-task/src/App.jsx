import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Game from './components/Game.jsx';

function App() {
  const [token, setToken] = useState('');

  return (
    <div className="App">
      <h1>Hangman Game</h1>
      {!token ? <Login setToken={setToken} /> : <Game token={token} />}
    </div>
  );
}

export default App;
