import React from 'react';

const ActionButtons = ({ onCreateLobby, onOpenModal }) => {
  return (
    <div className="flex items-center">
      <button
        onClick={onCreateLobby}
        className="bg-green-500 text-white p-2 rounded mr-2"
      >
        Create Lobby
      </button>
      <button
        onClick={onOpenModal}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Join by ID
      </button>
    </div>
  );
};

export default ActionButtons;
