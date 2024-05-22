import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
// import axios from 'axios';
import axios from 'axios';

const Game = ({ token }) => {
  const [roomId, setRoomId] = useState('');
  const [word, setWord] = useState('');
  const [guess, setGuess] = useState('');
  const [gameRoom, setGameRoom] = useState(null);
  const socket = io.connect('http://localhost:4000');

  useEffect(() => {
    socket.on('updateGame', (updatedGameRoom) => {
      setGameRoom(updatedGameRoom);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleCreateRoom = async () => {
    try {
      const response = await axios.post('/game/create', { roomId, word }, { headers: { Authorization: `Bearer ${token}` } });
      console.log(response.data);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const handleJoinRoom = async () => {
    try {
      await axios.post('/game/join', { roomId, userId: 'user_id' }, { headers: { Authorization: `Bearer ${token}` } });
      socket.emit('joinRoom', roomId);
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  const handleMakeGuess = () => {
    socket.emit('makeGuess', { roomId, guess });
    setGuess('');
  };

  return (
    <div>
      <h2>Game Room</h2>
      <input type="text" placeholder="Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
      <input type="text" placeholder="Word" value={word} onChange={(e) => setWord(e.target.value)} />
      <button onClick={handleCreateRoom}>Create Room</button>
      <button onClick={handleJoinRoom}>Join Room</button>
      {gameRoom && (
        <div>
          <h3>Game Status</h3>
          <p>Incorrect Guesses: {gameRoom.incorrectGuesses}</p>
          <p>Word: {gameRoom.word}</p>
          <p>Guesses: {gameRoom.guesses.join(', ')}</p>
          <input type="text" placeholder="Guess a letter" value={guess} onChange={(e) => setGuess(e.target.value)} />
          <button onClick={handleMakeGuess}>Make Guess</button>
        </div>
      )}
    </div>
  );
};

export default Game;
