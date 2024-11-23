import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import LobbyList from "../components/LobbyList";
import ActionButtons from "../components/ActionButtons";
import JoinByIdModal from "../components/JoinByIdModal";
import LobbyDetailModal from "../components/LobbyDetailModal";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [lobbies, setLobbies] = useState([
    { id: 1, name: "Lobby 1", uniqueId: "abc123", visibility: "public" },
    { id: 2, name: "Lobby 2", uniqueId: "def456", visibility: "public" },
    { id: 3, name: "Lobby 3", uniqueId: "ghi789", visibility: "public" },
    { id: 4, name: "Lobby 4", uniqueId: "abc123", visibility: "friends-only" },
    { id: 5, name: "Lobby 5", uniqueId: "def456", visibility: "friends-only" },
    { id: 6, name: "Lobby 6", uniqueId: "ghi789", visibility: "private" },
  ]);
  const [filteredLobbies, setFilteredLobbies] = useState(lobbies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLobby, setSelectedLobby] = useState(null);
  const [visibilityFilter, setVisibilityFilter] = useState("all");
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

    if (visibilityFilter === "friends-only") {
      filtered = filtered.filter(
        (lobby) => lobby.visibility === "friends-only"
      );
    } else if (visibilityFilter === "public") {
      filtered = filtered.filter((lobby) => lobby.visibility === "public");
    }

    setFilteredLobbies(filtered);
  };

  const handleCreateLobby = () => {
    // Logic to create a new lobby
    navigate("/create-lobby");
  };

  const handleJoinLobby = (uniqueId) => {
    // Logic to join a lobby by unique ID
    navigate(`/lobby/${uniqueId}`);
  };

  const handleJoinById = (uniqueId) => {
    // Logic to join a lobby by unique ID
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

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">Available Lobbies</h1>
        <div className="flex justify-between items-center mb-4">
          <div>
            <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
            <select
              value={visibilityFilter}
              onChange={handleVisibilityFilterChange}
              className="border p-2 mb-4 w-fit ml-2 bg-white rounded shadow-sm focus:outline-none"
            >
              <option value="all">All Lobbies</option>
              <option value="public">Public</option>
              <option value="friends-only">Friends-Only</option>
            </select>
          </div>
          <ActionButtons
            onCreateLobby={handleCreateLobby}
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
      </div>
    </>
  );
};

export default Home;
