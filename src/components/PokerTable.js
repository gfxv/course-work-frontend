import React from "react";

const PokerTable = ({ players }) => {
  return (
    <div className="relative w-full h-full bg-green-700 rounded-full shadow-lg overflow-hidden">
      {players.map((player, index) => (
        <div
          key={player.id}
          className="absolute text-white text-center transform"
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
  const radiusX = 360;
  const radiusY = 260;
  const x = Math.cos(angle) * radiusX;
  const y = Math.sin(angle) * radiusY;

  return {
    left: `calc(50% + ${x}px)`,
    top: `calc(50% + ${y}px)`,
    transform: "translate(-50%, -50%)",
  };
};

export default PokerTable;
