import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import LobbyList from "../components/LobbyList";
import ActionButtons from "../components/ActionButtons";
import JoinByIdModal from "../components/JoinByIdModal";
import LobbyDetailModal from "../components/LobbyDetailModal";
import CreateLobbyModal from "../components/CreateLobbyModal";

import { API_URL } from "../config";

const Home = () => {
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const [lobbies, setLobbies] = useState([]);
  const [filteredLobbies, setFilteredLobbies] = useState(lobbies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLobby, setSelectedLobby] = useState(null);
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [isCreateLobbyModalOpen, setIsCreateLobbyModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterLobbies(value, visibilityFilter);
  };

  const handleVisibilityFilterChange = (e) => {
    const value = e.target.value;
    setVisibilityFilter(value);
    filterLobbies(searchTerm, value);
  };

  const filterLobbies = (searchTerm, visibilityFilter) => {
    let filtered = lobbies.filter((lobby) =>
      lobby.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (visibilityFilter.toLowerCase() === "friends-only") {
      filtered = filtered.filter(
        (lobby) => lobby.type.toLowerCase() === "friends-only"
      );
    } else if (visibilityFilter === "public") {
      filtered = filtered.filter((lobby) => lobby.type.toLowerCase() === "public");
    }

    setFilteredLobbies(filtered);
  };

  const handleCreateLobby = (newLobby) => {
    setLobbies([...lobbies, newLobby]);
    setFilteredLobbies(lobbies)
    setIsCreateLobbyModalOpen(false);
    // navigate(`/lobby/${uniqueId}`);
  };

  const handleJoinLobby = (uniqueId) => {
    navigate(`/lobby/${uniqueId}`);
  };

  const handleJoinById = (uniqueId) => {
    navigate(`/lobby/${uniqueId}`);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLobby(null);
  };

  const handleLobbyClick = (lobby) => {
    setSelectedLobby(lobby);
    setIsModalOpen(true);
  };

  const openCreateLobbyModal = () => {
    setIsCreateLobbyModalOpen(true);
  };

  const closeCreateLobbyModal = () => {
    setIsCreateLobbyModalOpen(false);
  };

  useEffect(() => {
    const fetchLobbies = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_lobbies`);
        if (response.data.status.toLowerCase() === 'success') {
          setLobbies(response.data.lobbies);
          setFilteredLobbies(response.data.lobbies)
        } else {
          setError(response.data.message || 'Failed to fetch lobbies');
        }
      } catch (err) {
        setError('An error occurred while fetching lobbies');
        console.error(err);
      }
    };

    fetchLobbies();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">Available Lobbies</h1>
        {error && <p className="my-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">{error}</p>}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
            <select
              value={visibilityFilter}
              onChange={handleVisibilityFilterChange}
              className="border p-2 w-fit ml-2 bg-white rounded shadow-sm focus:outline-none"
            >
              <option value="all">All Lobbies</option>
              <option value="public">Public Lobbies</option>
              <option value="friends-only">Friends-Only Lobbies</option>
            </select>
          </div>
          <ActionButtons
            onCreateLobby={openCreateLobbyModal}
            onOpenModal={openModal}
          />
        </div>
        <LobbyList lobbies={filteredLobbies} onLobbyClick={handleLobbyClick} />
        <JoinByIdModal
          isOpen={isModalOpen && !selectedLobby}
          onClose={closeModal}
          onJoin={handleJoinById}
        />
        {selectedLobby && (
          <LobbyDetailModal
            isOpen={isModalOpen}
            onClose={closeModal}
            lobby={selectedLobby}
            onJoin={() => handleJoinLobby(selectedLobby.uniqueId)}
          />
        )}
        <CreateLobbyModal
          isOpen={isCreateLobbyModalOpen}
          onClose={closeCreateLobbyModal}
          onCreate={handleCreateLobby}
        />
      </div>
    </>
  );
};

export default Home;
