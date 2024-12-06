import React, { useState, forwardRef, useImperativeHandle } from "react";

const PokerTable = forwardRef(({ players }, ref) => {
  const [flop, setFlop] = useState([]);
  const [turn, setTurn] = useState(null);
  const [river, setRiver] = useState(null);

  useImperativeHandle(ref, () => ({
    displayFlop: (cards) => setFlop(cards),
    displayTurn: (card) => setTurn(card),
    displayRiver: (card) => setRiver(card),
  }));

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
      <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {flop.map((card, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded shadow w-20 h-32 flex items-center justify-center text-2xl"
          >
            {card}
          </div>
        ))}
        {turn && (
          <div className="bg-white p-4 rounded shadow w-20 h-32 flex items-center justify-center text-2xl">
            {turn}
          </div>
        )}
        {river && (
          <div className="bg-white p-4 rounded shadow w-20 h-32 flex items-center justify-center text-2xl">
            {river}
          </div>
        )}
      </div>
    </div>
  );
});

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
