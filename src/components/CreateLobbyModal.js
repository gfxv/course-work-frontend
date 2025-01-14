import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

import API_URL from "../config";
import { AuthContext } from "../context/AuthContext";

const CreateLobbyModal = ({ isOpen, onClose, onCreate }) => {
  const [error, setError] = useState("");
  const [lobbyName, setLobbyName] = useState("My Lobby");
  const [visibility, setVisibility] = useState("public");
  const [blindSize, setBlindSize] = useState(0);
  const [minPlayers, setMinPlayers] = useState(3);
  const [maxPlayers, setMaxPlayers] = useState(8);
  const [tableCount, setTableCount] = useState(1);

  const { authState } = useContext(AuthContext)
  const token = authState.token;
  // const navigate = useNavigate();

  const handleCreate = async () => {
    const newLobby = {
      name: lobbyName,
      lobbyType: visibility.toUpperCase(),
      blind: parseInt(blindSize, 10),
      // min_players: parseInt(minPlayers, 10),
      // max_players: parseInt(maxPlayers, 10),
      number_of_tables: parseInt(tableCount, 10),
      status: "ACTIVE"
    }
    
    try {
      const response = await axios.post(`${API_URL}/create_lobby`, newLobby, {
        headers: {
          'Authorization': `Bearer ${token}`,
          // 'Content-Type': 'application/json'
        }
      });
      if (response.data.status.toLowerCase() === "success") {
        onCreate();
      } else {
        setError(response.data.message || "Failed to create lobby");
      }
    } catch (err) {
      setError("An error occurred while creating the lobby");
      console.error(err);
    }
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
            {/* <option value="friends-only">Friends-Only</option> */}
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
            min={ 3 }
            max={ 8 }
            value={minPlayers}
            onChange={(e) => setMinPlayers(e.target.value)}
            className="border p-2 w-full mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Max Players</label>
          <input
            type="number"
            min={ 3 }
            max={ 8 }
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(e.target.value)}
            className="border p-2 w-full mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Number of Tables</label>
          <input
            type="number"
            min={ 1 }
            max={ 8 }
            value={tableCount}
            onChange={(e) => setTableCount(e.target.value)}
            className="border p-2 w-full mt-1"
          />
        </div>
        {error && <p className="my-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">{error}</p>}
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
