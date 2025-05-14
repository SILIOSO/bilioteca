import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReservationsList from '../components/ReservationsList';

const ReservationsPage = () => {
  // Datos de ejemplo para las reservas
  const reservations = [
    {
      id: 1,
      title: "Cuentos Macabros",
      status: "Activa",
      loanDate: "15/05/2025",
      returnDate: "25/05/2025",
      coverImage: "/placeholder.png"
    },
    {
      id: 2,
      title: "Los Juicios de Salem",
      status: "Activa",
      loanDate: "01/05/2025",
      returnDate: "10/05/2025",
      coverImage: "/placeholder.png"
    },
    {
      id: 3,
      title: "Los Hombres del Norte",
      status: "Activa",
      loanDate: "25/04/2025",
      returnDate: "02/05/2025",
      coverImage: "/placeholder.png"
    }
  ];

  return (
    <div className="page reservations-page">
      <Header />
      <main className="main-content">
        <div className="banner-container">
          <h1 className="page-title">Reservas</h1>
        </div>
        <ReservationsList reservations={reservations} />
      </main>
      <Footer />
    </div>
  );
};

export default ReservationsPage;