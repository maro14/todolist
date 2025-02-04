import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import './SearchBar.css';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-bar">
      <MagnifyingGlassIcon className="search-icon" />
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar; 