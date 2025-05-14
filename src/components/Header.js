import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <button className="menu-button">
          <span className="menu-icon"></span>
        </button>
        <SearchBar />
        <div className="header-buttons">
          <Link to="/perfil" className="profile-button">
            <span className="profile-icon"></span>
          </Link>
          <Link to="/reservas" className="reservations-button">
            <span className="reservations-icon"></span>
          </Link>
        </div>
      </div>
      <div className="categories-banner">
        <Link to="/categorias" className="categories-link">
          <div className="book-shelf"></div>
        </Link>
      </div>
    </header>
  );
};

export default Header;