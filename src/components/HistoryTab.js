import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HistoryTab = () => {
  const [history, setHistory] = useState([
    { id: 1, date: '2023-10-01', result: 'win', amount: 500 },
    { id: 2, date: '2023-09-25', result: 'loss', amount: -200 },
    { id: 3, date: '2023-09-15', result: 'win', amount: 300 },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterResult, setFilterResult] = useState('all');
  const navigate = useNavigate();

  const handleShare = (matchId) => {
    const shareLink = `https://example.com/match/${matchId}`;
    navigator.clipboard.writeText(shareLink).then(() => {
      alert('Match link copied to clipboard!');
    });
  };

  const handleViewHistory = (matchId) => {
    navigate(`/history/${matchId}`);
  };

  const filteredHistory = history.filter((match) => {
    const matchesSearch = match.date.includes(searchTerm);
    const matchesResult =
      filterResult === 'all' ||
      (filterResult === 'win' && match.result === 'win') ||
      (filterResult === 'loss' && match.result === 'loss');
    return matchesSearch && matchesResult;
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">History</h2>
      <div className="flex mb-4 space-x-4">
        <input
          type="text"
          placeholder="Search by date..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-1/3"
        />
        <select
          value={filterResult}
          onChange={(e) => setFilterResult(e.target.value)}
          className="border p-2 w-1/5"
        >
          <option value="all">All</option>
          <option value="win">Wins</option>
          <option value="loss">Losses</option>
        </select>
      </div>
      <ul>
        {filteredHistory.map((match) => (
          <li
            key={match.id}
            className={`flex justify-between items-center p-2 mb-1 hover:cursor-pointer ${
              match.result === 'win' ? 'bg-green-100' : 'bg-red-100'
            } rounded`}
            onClick={() => handleViewHistory(match.id)}
          >
            <div>
              {match.date}
            </div>
            <div>
              {match.result.toUpperCase()}
            </div>
            <div>
              {match.result === 'win' ? `+$${match.amount}` : `-$${Math.abs(match.amount)}`}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare(match.id);
              }}
              className="text-blue-500"
            >
              Share
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryTab;
