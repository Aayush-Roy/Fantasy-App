import React, { useState } from 'react';
import axios from 'axios';

const TeamForm = () => {
  const [teamName, setTeamName] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const addPlayer = (player) => {
    if (selectedPlayers.length < 11) {
      setSelectedPlayers([...selectedPlayers, player]);
    } else {
      alert('You can only select up to 11 players');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedPlayers.length === 0) return alert('Add at least 1 player');

    try {
      await axios.post('http://localhost:5000/teams', {
        name: teamName,
        players: selectedPlayers.map((p) => p._id),
      });
      alert('Team created successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Your Team</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
        <button type="submit">Create Team</button>
      </form>
      <h3>Selected Players:</h3>
      <ul>
        {selectedPlayers.map((player) => (
          <li key={player._id}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeamForm;
