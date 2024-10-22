import React from 'react';
import PlayerList from './components/PlayerList';
import TeamForm from './components/TeamForm';

const App = () => {
  return (
    <div>
      <h1>Fantasy Game</h1>
      <TeamForm />
      <PlayerList />
    </div>
  );
};

export default App;
