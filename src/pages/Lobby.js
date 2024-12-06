import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PokerTable from "../components/PokerTable";
import PlayerInfo from "../components/PlayerInfo";
import LobbyInfo from "../components/LobbyInfo";
import Header from "../components/Header";

const Lobby = () => {
  const { lobbyId } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [lobbyInfo, setLobbyInfo] = useState({
    lobbyName: "",
    lobbyType: "",
    host: "",
    blindSize: "",
    createdAt: "",
  });

  useEffect(() => {
    // Simulate fetching lobby data
    const fetchLobbyData = async () => {
      // Simulate API call to get lobby data
      const lobbyData = {
        id: lobbyId,
        ownerId: "owner123",
        players: [
          { id: "player1", nickname: "Player 1" },
          { id: "player2", nickname: "Player 2" },
          { id: "owner123", nickname: "Owner" },
        ],
        lobbyName: "Lobby 1",
        lobbyType: "public",
        host: "Owner",
        blindSize: "1/2",
        createdAt: "2023-10-01 12:00:00",
      };
      setPlayers(lobbyData.players);
      setIsOwner(lobbyData.ownerId === "owner123"); // Simulate checking if the current user is the owner
      setLobbyInfo({
        lobbyName: lobbyData.lobbyName,
        lobbyType: lobbyData.lobbyType,
        host: lobbyData.host,
        blindSize: lobbyData.blindSize,
        createdAt: lobbyData.createdAt,
      });
    };

    fetchLobbyData();
  }, [lobbyId]);

  const handleStartGame = () => {
    // Logic to start the game
    alert("Game started!");
  };

  const handleQuitLobby = () => {
    // Logic to quit the lobby
    navigate("/");
  };

  return (
    <>
      <Header/>
      <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
        <div className="w-full max-w-4xl mx-auto flex justify-between items-start">
          <div className="w-full">
            <PokerTable players={players} />
          </div>
          <div className="ml-4 w-full max-w-xs">
            <LobbyInfo
              lobbyName={lobbyInfo.lobbyName}
              lobbyType={lobbyInfo.lobbyType}
              host={lobbyInfo.host}
              blindSize={lobbyInfo.blindSize}
              createdAt={lobbyInfo.createdAt}
            />
            <PlayerInfo players={players} />
            <div className="mt-4">
              {isOwner ? (
                <button
                  onClick={handleStartGame}
                  className="bg-green-500 text-white p-2 rounded w-full"
                >
                  Start Game
                </button>
              ) : (
                <button
                  onClick={handleQuitLobby}
                  className="bg-red-500 text-white p-2 rounded w-full"
                >
                  Quit Lobby
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lobby;
