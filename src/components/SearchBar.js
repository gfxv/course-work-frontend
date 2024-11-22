import React from 'react';

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search lobbies..."
      value={searchTerm}
      onChange={onSearch}
      className="border p-2 w-1/5"
    />
  );
};

export default SearchBar;
