import React from 'react';

const LobbyDetailModal = ({ isOpen, onClose, lobby, onJoin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{lobby.name}</h2>
        <p className="text-gray-600 mb-4">Unique ID: {lobby.uniqueId}</p>
        <div className="flex justify-end">
          <button
            onClick={onJoin}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Join Lobby
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

export default LobbyDetailModal;
