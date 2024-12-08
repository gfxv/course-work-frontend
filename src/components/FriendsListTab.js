import React, { useState } from 'react';

const FriendsListTab = () => {
  const [friends, setFriends] = useState([
    { id: 1, name: 'Friend 1', status: 'in match' },
    { id: 2, name: 'Friend 2', status: 'available' },
    { id: 3, name: 'Friend 3', status: 'pending' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleRemoveFriend = (friendId) => {
    setFriends(friends.filter((friend) => friend.id !== friendId));
  };

  const handleCancelRequest = (friendId) => {
    setFriends(friends.filter((friend) => friend.id !== friendId));
  };

  const filteredFriends = friends.filter((friend) => {
    const matchesSearch = friend.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'friends' && friend.status !== 'pending') ||
      (filterStatus === 'pending' && friend.status === 'pending');
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Friends List</h2>
      <div className="flex mb-4 space-x-4">
        <input
          type="text"
          placeholder="Search friends..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-1/3"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 w-1/5"
        >
          <option value="all">All</option>
          <option value="friends">Friends</option>
          <option value="pending">Pending Requests</option>
        </select>
      </div>
      <ul>
        {filteredFriends.map((friend) => (
          <li
            key={friend.id}
            className="flex justify-between items-center p-2 mb-2 bg-white"
          >
            <div className={`flex items-center ${friend.status === 'pending' ? 'text-gray-400' : ''}`}>
              <strong>{friend.name}</strong>
            </div>
            <div className={`flex-1 text-center ${friend.status === 'pending' ? 'text-gray-400' : ''}`}>
              {friend.status}
            </div>
            <div>
              {friend.status === 'pending' ? (
                <button
                  onClick={() => handleCancelRequest(friend.id)}
                  className="text-red-500"
                >
                  Cancel Request
                </button>
              ) : (
                <button
                  onClick={() => handleRemoveFriend(friend.id)}
                  className="text-red-500"
                >
                  Remove Friend
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsListTab;
