import React from "react";

const PokerTable = ({ players }) => {
  return (
    <div className="relative w-full max-w-xl mx-auto bg-green-700 rounded-full h-96 shadow-lg overflow-hidden">
      {players.map((player, index) => (
        <div
          key={player.id}
          className="absolute text-white text-center transform w-fit"
          style={getPlayerPosition(index, players.length)}
        >
          {player.nickname}
        </div>
      ))}
    </div>
  );
};

const getPlayerPosition = (index, totalPlayers) => {
  const angle = (index / totalPlayers) * 2 * Math.PI;
  const radiusX = 250; // Adjust the x-radius as needed
  const radiusY = 180; // Adjust the y-radius as needed
  const x = Math.cos(angle) * radiusX;
  const y = Math.sin(angle) * radiusY;

  return {
    left: `calc(50% + ${x}px)`,
    top: `calc(50% + ${y}px)`,
    transform: "translate(-50%, -50%)",
  };
};

export default PokerTable;
