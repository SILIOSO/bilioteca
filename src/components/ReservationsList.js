import React from 'react';
import { Link } from 'react-router-dom';

const ReservationsList = ({ reservations }) => {
  return (
    <div className="reservations-list">
      {reservations.map(reservation => (
        <div className="reservation-item" key={reservation.id}>
          <Link to={`/book/${reservation.id}`} className="reservation-link">
            <div className="reservation-cover">
              <img 
                src={reservation.coverImage} 
                alt={reservation.title} 
                className="reservation-image" 
              />
            </div>
            <div className="reservation-info">
              <h3 className="reservation-title">{reservation.title}</h3>
              <div className="reservation-status">
                <p className="status-label">Estado de la reserva: </p>
                <p className="status-value">{reservation.status}</p>
              </div>
              <div className="reservation-dates">
                <div className="date-info">
                  <p className="date-label">Fecha préstamo: </p>
                  <p className="date-value">{reservation.loanDate}</p>
                </div>
                <div className="date-info">
                  <p className="date-label">Fecha devolución: </p>
                  <p className="date-value">{reservation.returnDate}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ReservationsList;