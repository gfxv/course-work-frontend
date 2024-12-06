import React from 'react';

const PlayerInfo = ({ players }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md w-full mb-4">
      <h2 className="text-xl font-bold mb-4">Players</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id} className="mb-2">
            {player.nickname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerInfo;
