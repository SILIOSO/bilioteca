import React from 'react';
import { Navigate } from 'react-router-dom';
import { getBookById } from '../../utils/bookService';
import './Account.css';

const Account = ({ isAuthenticated, userData }) => {
  // Redirigir a login si no está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Obtener los libros favoritos
  const favoriteBooks = (userData?.favorites || []).map(bookId => {
    try {
      return getBookById(bookId);
    } catch (error) {
      console.error(`Error al obtener libro favorito ${bookId}:`, error);
      return null;
    }
  }).filter(book => book !== null);

  return (
    <div className="account-page">
      <div className="account-container">
        <div className="account-header">
          <div className="profile-picture">
            <div className="profile-picture-placeholder">
              {userData?.name?.charAt(0) || 'U'}
            </div>
          </div>
          <div className="profile-info">
            <h1>{userData?.name || 'Usuario'}</h1>
            <p className="member-since">Miembro desde {new Date().getFullYear()}</p>
          </div>
        </div>

        <div className="account-sections">
          <section className="account-section">
            <h2>Información Personal</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Nombre</label>
                <input type="text" value={userData?.name || ''} readOnly />
              </div>
              <div className="info-item">
                <label>Correo Electrónico</label>
                <input type="email" value={userData?.email || ''} readOnly />
              </div>
            </div>
            <button className="edit-button">Editar Información</button>
          </section>

          <section className="account-section">
            <h2>Libros Favoritos</h2>
            {favoriteBooks.length === 0 ? (
              <p className="empty-state">No has marcado ningún libro como favorito</p>
            ) : (
              <div className="favorites-grid">
                {favoriteBooks.map(book => (
                  <div key={book.id} className="favorite-book-card">
                    <div className="book-image">
                      <img src={book.image} alt={book.title} />
                    </div>
                    <div className="book-info">
                      <h3>{book.title}</h3>
                      <p className="author">{book.author}</p>
                      <p className="category">{book.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="account-section">
            <h2>Préstamos Actuales</h2>
            {(!userData?.currentLoans || userData.currentLoans.length === 0) ? (
              <p className="empty-state">No tienes libros prestados actualmente</p>
            ) : (
              <div className="loans-list">
                {/* Lista de préstamos aquí */}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Account; 