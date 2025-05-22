import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Reservations.css';

const Reservations = ({ isAuthenticated, userData, onCancelReservation }) => {
  const [cancelingId, setCancelingId] = useState(null);

  // Redirigir a login si no está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Ejemplo de datos de reservas (esto deberá venir de tu backend)
  const reservations = userData?.reservations || [];

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCancelReservation = (reservationId) => {
    setCancelingId(reservationId);
    onCancelReservation(reservationId);
  };

  return (
    <div className="reservations-page">
      <div className="reservations-container">
        <h1>Mis Reservas</h1>

        {reservations.length === 0 ? (
          <div className="empty-reservations">
            <p>No tienes libros reservados actualmente</p>
            <p className="suggestion">Explora nuestro catálogo para encontrar tu próxima lectura</p>
          </div>
        ) : (
          <div className="reservations-grid">
            {reservations.map((reservation) => (
              <div key={reservation.id} className="reservation-card">
                <div className="book-image">
                  {reservation.book.coverImage ? (
                    <img src={reservation.book.coverImage} alt={reservation.book.title} />
                  ) : (
                    <div className="no-cover">
                      <span>Sin portada</span>
                    </div>
                  )}
                </div>
                <div className="reservation-info">
                  <h3>{reservation.book.title}</h3>
                  <p className="author">{reservation.book.author}</p>
                  <div className="reservation-dates">
                    <div className="date-item">
                      <span className="date-label">Fecha de reserva:</span>
                      <span className="date-value">{formatDate(reservation.reservationDate)}</span>
                    </div>
                    <div className="date-item">
                      <span className="date-label">Fecha de devolución:</span>
                      <span className="date-value">{formatDate(reservation.returnDate)}</span>
                    </div>
                  </div>
                  <div className="reservation-status">
                    <span className={`status-badge ${reservation.status.toLowerCase()}`}>
                      {reservation.status}
                    </span>
                  </div>
                  <button 
                    className="cancel-button"
                    onClick={() => handleCancelReservation(reservation.id)}
                    disabled={cancelingId === reservation.id}
                  >
                    {cancelingId === reservation.id ? 'Cancelando...' : 'Cancelar Reserva'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations; 