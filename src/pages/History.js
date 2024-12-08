import React from 'react';
import Header from '../components/Header';

const History = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Match History</h2>
          <div>
            {/* Placeholder for match history details */}
            <p>Match details will be displayed here.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
