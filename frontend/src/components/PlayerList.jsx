import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerList = ({ addPlayer }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/players')
      .then((response) => setPlayers(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>Select Players</h2>
      <ul>
        {players.map((player) => (
          <li key={player._id}>
            {player.name} - {player.role} - {player.points} points
            <button onClick={() => addPlayer(player)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
