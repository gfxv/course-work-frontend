import React, { useState } from 'react';

const JoinByIdModal = ({ isOpen, onClose, onJoin }) => {
  const [lobbyId, setLobbyId] = useState('');

  const handleJoin = () => {
    onJoin(lobbyId);
    setLobbyId('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Join Lobby by ID</h2>
        <input
          type="text"
          placeholder="Enter Lobby ID"
          value={lobbyId}
          onChange={(e) => setLobbyId(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <div className="flex justify-end">
          <button
            onClick={handleJoin}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Join
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black p-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinByIdModal;
