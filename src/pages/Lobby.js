import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PokerTable from '../components/PokerTable';
import PlayerInfo from '../components/PlayerInfo';

const Lobby = () => {
  const { lobbyId } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    // Simulate fetching lobby data
    const fetchLobbyData = async () => {
      // Simulate API call to get lobby data
      const lobbyData = {
        id: lobbyId,
        ownerId: 'owner123',
        players: [
          { id: 'player1', nickname: 'Player 1' },
          { id: 'player2', nickname: 'Player 2' },
          { id: 'owner123', nickname: 'Owner' },
        ],
      };
      setPlayers(lobbyData.players);
      setIsOwner(lobbyData.ownerId === 'owner123'); // Simulate checking if the current user is the owner
    };

    fetchLobbyData();
  }, [lobbyId]);

  const handleStartGame = () => {
    // Logic to start the game
    alert('Game started!');
  };

  const handleQuitLobby = () => {
    // Logic to quit the lobby
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-center">
      <div className="w-full max-w-4xl mx-auto flex justify-between items-start">
        <PokerTable players={players} />
        <div className="ml-4">
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
  );
};

export default Lobby;
