import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import LobbyList from "../components/LobbyList";
import ActionButtons from "../components/ActionButtons";
import JoinByIdModal from "../components/JoinByIdModal";
import Header from "../components/Header";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [lobbies, setLobbies] = useState([
    { id: 1, name: "Lobby 1", uniqueId: "abc123" },
    { id: 2, name: "Lobby 2", uniqueId: "def456" },
    { id: 3, name: "Lobby 3", uniqueId: "ghi789" },
  ]);
  const [filteredLobbies, setFilteredLobbies] = useState(lobbies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredLobbies(
      lobbies.filter((lobby) =>
        lobby.name.toLowerCase().includes(value.toLowerCase())
      )
    );
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
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">Available Lobbies</h1>
        <div className="flex justify-between items-center mb-4">
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          <ActionButtons
            onCreateLobby={handleCreateLobby}
            onOpenModal={openModal}
          />
        </div>
        <LobbyList lobbies={filteredLobbies} onJoinLobby={handleJoinLobby} />
        <JoinByIdModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onJoin={handleJoinById}
        />
      </div>
    </>
  );
};

export default Home;
