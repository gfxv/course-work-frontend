import React from 'react';

const LobbyCard = ({ lobby, onClick }) => {

  const visibilityColor = () => {
    switch (lobby.visibility) {
      case "public":
        return "bg-blue-400"
      case "friends-only":
        return "bg-emerald-400"
      case "private":
        return "bg-gray-400"
      default:
        return "bg-red-400"
    }
  }

  const color = visibilityColor()

  return (
    <div
      onClick={() => onClick(lobby)}
      className="bg-white p-4 rounded shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      <h2 className="text-xl font-bold">{lobby.name}</h2>
      <p className="text-gray-600">Unique ID: {lobby.uniqueId}</p>
      <p className={`border w-fit mt-1 px-2 rounded-full text-sm text-white ${color}`}>
        {lobby.visibility}
      </p>
    </div>
  );
};

export default LobbyCard;
