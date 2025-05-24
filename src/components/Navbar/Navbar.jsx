import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, userData, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const normalizeForUrl = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const isAdmin = userData?.email === 'cazador7676@gmail.com';

  const categories = {
    ciencia: {
      name: 'Ciencia',
      subcategories: ['Biología', 'Química', 'Física', 'Astronomía']
    },
    tecnologia: {
      name: 'Tecnología',
      subcategories: ['Informática', 'Robótica', 'Electrónica']
    },
    matematicas: {
      name: 'Matemáticas',
      subcategories: ['Álgebra', 'Geometría', 'Cálculo']
    },
    literatura: {
      name: 'Literatura',
      subcategories: ['Terror', 'Romance', 'Fantasía', 'Clásicos']
    }
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className="menu-lines">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={`menu-items ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={handleLinkClick}>
          Inicio
        </Link>
        
        <div className="categories-dropdown">
          <Link to="#">
            Categorías
          </Link>
          <div className="categories-submenu">
            {Object.entries(categories).map(([key, category]) => (
              <div key={key} className="category-item">
                <Link to={`/categoria/${key}`}>
                  {category.name}
                </Link>
                <div className="subcategories-submenu">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory}
                      to={`/categoria/${key}/${normalizeForUrl(subcategory)}`}
                      onClick={handleLinkClick}
                    >
                      {subcategory}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {isAuthenticated && (
          <>
            <Link to="/reservas" onClick={handleLinkClick}>
              Reservas
            </Link>
            <Link to="/cuenta" onClick={handleLinkClick}>
              Mi Cuenta
            </Link>
            {isAdmin && (
              <Link to="/admin" onClick={handleLinkClick} className="admin-link">
                Admin
              </Link>
            )}
          </>
        )}
      </div>

      {!isAuthenticated ? (
        <Link to="/login" className="login-button">
          Iniciar Sesión
        </Link>
      ) : (
        <div className="user-controls">
          <Link to="/cuenta" className="user-profile-link">
            <div className="user-profile-info">
              <span className="user-name">{userData?.name || 'Usuario'}</span>
              <div className="user-avatar">
                {userData?.name?.charAt(0) || 'U'}
              </div>
            </div>
          </Link>
          <button onClick={handleLogout} className="logout-button">
            Cerrar Sesión
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 