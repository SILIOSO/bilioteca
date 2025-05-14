import React from 'react';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search" className="search-input" />
      <button className="search-button">
        <span className="search-icon"></span>
      </button>
    </div>
  );
};

export default SearchBar;