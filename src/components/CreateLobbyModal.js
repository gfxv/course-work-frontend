import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateLobbyModal = ({ isOpen, onClose, onCreate }) => {
  const [lobbyName, setLobbyName] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [blindSize, setBlindSize] = useState('');
  const [minPlayers, setMinPlayers] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  const navigate = useNavigate();

  const handleCreate = () => {
    const newLobby = {
      name: lobbyName,
      visibility,
      blindSize,
      minPlayers,
      maxPlayers,
    };
    onCreate(newLobby);
    // navigate(`/lobby/${newLobby.uniqueId}`); // Redirect to the new lobby
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create Lobby</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Lobby Name</label>
          <input
            type="text"
            value={lobbyName}
            onChange={(e) => setLobbyName(e.target.value)}
            className="border p-2 w-full mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Visibility</label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="border p-2 w-full mt-1"
          >
            <option value="public">Public</option>
            <option value="friends-only">Friends-Only</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Blind Size</label>
          <input
            type="number"
            value={blindSize}
            onChange={(e) => setBlindSize(e.target.value)}
            className="border p-2 w-full mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Min Players</label>
          <input
            type="number"
            value={minPlayers}
            onChange={(e) => setMinPlayers(e.target.value)}
            className="border p-2 w-full mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Max Players</label>
          <input
            type="number"
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(e.target.value)}
            className="border p-2 w-full mt-1"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleCreate}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Create
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

export default CreateLobbyModal;
