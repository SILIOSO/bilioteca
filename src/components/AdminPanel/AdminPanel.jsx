import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getPendingReservations, approveReservation, rejectReservation } from '../../utils/reservationService';
import './AdminPanel.css';

const AdminPanel = ({ isAuthenticated, userData }) => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      // Obtener todas las reservas
      const allReservations = getPendingReservations();
      console.log('Reservas obtenidas:', allReservations);
      setReservations(allReservations);
    } catch (error) {
      console.error('Error al cargar reservas:', error);
      setError('Error al cargar las reservas');
    }
  }, []);

  // Verificar si el usuario está autenticado y es el administrador
  if (!isAuthenticated || userData?.email !== 'cazador7676@gmail.com') {
    return <Navigate to="/" />;
  }

  const handleApproveReservation = async (userEmail, reservationId) => {
    try {
      await approveReservation(userEmail, reservationId);
      setReservations(getPendingReservations());
      alert('Reserva aprobada exitosamente');
    } catch (error) {
      alert('Error al aprobar la reserva: ' + error.message);
    }
  };

  const handleRejectReservation = async (userEmail, reservationId) => {
    if (window.confirm('¿Estás seguro de que deseas rechazar esta reserva?')) {
      try {
        await rejectReservation(userEmail, reservationId);
        setReservations(getPendingReservations());
        alert('Reserva rechazada exitosamente');
      } catch (error) {
        alert('Error al rechazar la reserva: ' + error.message);
      }
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-container">
        <h1>Panel de Administración</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <section className="admin-section">
          <h2>Todas las Reservas</h2>
          <div className="reservations-list">
            {reservations.length === 0 ? (
              <p className="empty-state">No hay reservas registradas</p>
            ) : (
              reservations.map(reservation => (
                <div key={reservation.id} className="reservation-item">
                  <div className="reservation-info">
                    <img src={reservation.book.coverImage} alt={reservation.book.title} className="book-thumbnail" />
                    <div className="details">
                      <h3>{reservation.book.title}</h3>
                      <p>Solicitado por: {reservation.userName}</p>
                      <p>Email: {reservation.userEmail}</p>
                      <p>Fecha de solicitud: {new Date(reservation.reservationDate).toLocaleDateString()}</p>
                      <p>Estado: <span className={`status-badge ${reservation.status.toLowerCase()}`}>{reservation.status}</span></p>
                    </div>
                  </div>
                  <div className="reservation-actions">
                    {reservation.status === 'PENDIENTE' && (
                      <>
                        <button
                          className="approve-button"
                          onClick={() => handleApproveReservation(reservation.userEmail, reservation.id)}
                        >
                          Aprobar
                        </button>
                        <button
                          className="reject-button"
                          onClick={() => handleRejectReservation(reservation.userEmail, reservation.id)}
                        >
                          Rechazar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPanel; 