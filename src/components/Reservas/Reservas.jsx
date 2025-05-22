import React from 'react';
import './Reservas.css';

const Reservas = () => {
  // Aquí normalmente obtendrías las reservas desde una API
  const reservas = [
    {
      id: 1,
      title: 'Cuentos Macabros',
      image: '/images/cuentos-macabros.jpg',
      fechaPrestamo: '15/05/2025',
      fechaDevolucion: '25/05/2025',
      estado: 'Activa'
    },
    {
      id: 2,
      title: 'Los Juicios de Salem',
      image: '/images/juicios-salem.jpg',
      fechaPrestamo: '01/05/2025',
      fechaDevolucion: '10/05/2025',
      estado: 'Activa'
    }
  ];

  return (
    <div className="reservas-container">
      <h1>Mis Reservas</h1>
      
      <div className="reservas-list">
        {reservas.map((reserva) => (
          <div key={reserva.id} className="reserva-card">
            <div className="reserva-image">
              <img src={reserva.image} alt={reserva.title} />
            </div>
            
            <div className="reserva-info">
              <h2>{reserva.title}</h2>
              <div className="reserva-dates">
                <p>
                  <strong>Fecha préstamo:</strong> {reserva.fechaPrestamo}
                </p>
                <p>
                  <strong>Fecha devolución:</strong> {reserva.fechaDevolucion}
                </p>
              </div>
              <div className={`reserva-estado ${reserva.estado.toLowerCase()}`}>
                {reserva.estado}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservas; 