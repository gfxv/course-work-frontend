import React from 'react';

const LobbyInfo = ({ lobbyName, lobbyType, host, blindSize, createdAt }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md w-full mb-4">
      <h2 className="text-xl font-bold mb-2">Lobby Information</h2>
      <div className="mb-2">
        <strong>Lobby Name:</strong> {lobbyName}
      </div>
      <div className="mb-2">
        <strong>Lobby Type:</strong> {lobbyType}
      </div>
      <div className="mb-2">
        <strong>Host:</strong> {host}
      </div>
      <div className="mb-2">
        <strong>Blind Size:</strong> {blindSize}
      </div>
      <div className="mb-2">
        <strong>Created At:</strong> {createdAt}
      </div>
    </div>
  );
};

export default LobbyInfo;
