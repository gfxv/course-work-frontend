import React from 'react';
import LobbyCard from './LobbyCard';

const LobbyList = ({ lobbies, onLobbyClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {lobbies.map((lobby) => (
        <LobbyCard key={lobby.id} lobby={lobby} onClick={onLobbyClick} />
      ))}
    </div>
  );
};

export default LobbyList;
