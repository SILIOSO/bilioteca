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

  // Obtener préstamos activos (reservas con estado ACTIVA)
  const activeLoans = (userData?.reservations || []).filter(
    reservation => reservation.status === 'APROBADA'
  );

  // Calcular días restantes para cada préstamo
  const calculateRemainingDays = (returnDate) => {
    const today = new Date();
    const return_date = new Date(returnDate);
    const diffTime = return_date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

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
            {activeLoans.length === 0 ? (
              <p className="empty-state">No tienes libros prestados actualmente</p>
            ) : (
              <div className="loans-grid">
                {activeLoans.map(loan => {
                  const remainingDays = calculateRemainingDays(loan.returnDate);
                  return (
                    <div key={loan.id} className="loan-card">
                      <div className="book-image">
                        <img src={loan.book.coverImage} alt={loan.book.title} />
                      </div>
                      <div className="loan-info">
                        <h3>{loan.book.title}</h3>
                        <p className="author">{loan.book.author}</p>
                        <p className="dates">
                          <span>Fecha de préstamo: {new Date(loan.approvalDate).toLocaleDateString()}</span>
                          <span>Fecha de devolución: {new Date(loan.returnDate).toLocaleDateString()}</span>
                        </p>
                        <p className={`remaining-days ${remainingDays < 5 ? 'warning' : ''}`}>
                          {remainingDays > 0 
                            ? `${remainingDays} días restantes`
                            : 'Préstamo vencido'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Account; 