import React from 'react';

const LobbyList = ({ lobbies, onJoinLobby }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lobbies.map((lobby) => (
        <div key={lobby.id} className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold">{lobby.name}</h2>
          <p className="text-gray-600">Unique ID: {lobby.uniqueId}</p>
          <button
            onClick={() => onJoinLobby(lobby.uniqueId)}
            className="mt-2 bg-blue-500 text-white p-2 rounded"
          >
            Join Lobby
          </button>
        </div>
      ))}
    </div>
  );
};

export default LobbyList;
