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
  const [currentUserCards, setCurrentUserCards] = useState([]);

  useEffect(() => {
    // Simulate fetching lobby data
    const fetchLobbyData = async () => {
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
      // Simulate setting current user's cards
      setCurrentUserCards(["A♠", "K♦"]);
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

  const displayFlop = () => {
    // Simulate displaying the flop
    const flopCards = ["A♥", "K♦", "Q♣"];
    pokerTableRef.current.displayFlop(flopCards);
  };

  const displayTurn = () => {
    // Simulate displaying the turn
    const turnCard = "J♠";
    pokerTableRef.current.displayTurn(turnCard);
  };

  const displayRiver = () => {
    // Simulate displaying the river
    const riverCard = "10♥";
    pokerTableRef.current.displayRiver(riverCard);
  };

  const pokerTableRef = React.createRef();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
        <div className="w-full max-w-6xl mx-auto flex justify-between items-start">
          <div className="w-3/4 h-2/3 relative">
            <PokerTable ref={pokerTableRef} players={players} />
            <div className="absolute -bottom-36 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10">
              {currentUserCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded shadow w-20 h-32 flex items-center justify-center text-2xl transition-transform duration-300 hover:scale-110"
                >
                  {card}
                </div>
              ))}
            </div>
          </div>
          <div className="ml-4 w-1/4">
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
            {/* those buttons are temporal */}
            <div className="mt-4 flex space-x-2">
              <button
                onClick={displayFlop}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Display Flop
              </button>
              <button
                onClick={displayTurn}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Display Turn
              </button>
              <button
                onClick={displayRiver}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Display River
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lobby;
