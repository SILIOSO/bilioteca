import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import BookDetail from './components/BookDetail/BookDetail';
import SubcategoryBooks from './components/SubcategoryBooks/SubcategoryBooks';
import Account from './components/Account/Account';
import Reservations from './components/Reservations/Reservations';
import Footer from './components/Footer/Footer';
import { updateUser } from './utils/userService';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = (userInfo) => {
    setIsAuthenticated(true);
    setUserData(userInfo);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
  };

  const handleReserveBook = (bookData) => {
    if (!isAuthenticated || !userData) return false;

    // Verificar si el libro ya está reservado
    const isAlreadyReserved = userData.reservations?.some(
      reservation => reservation.book.id === bookData.id
    );

    if (isAlreadyReserved) {
      return false;
    }

    // Crear nueva reserva
    const newReservation = {
      id: Date.now().toString(),
      book: {
        id: bookData.id,
        title: bookData.title,
        author: bookData.author,
        coverImage: bookData.image
      },
      reservationDate: new Date().toISOString(),
      returnDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 días
      status: 'ACTIVA'
    };

    try {
      // Actualizar el estado del usuario con la nueva reserva
      const updatedUser = {
        ...userData,
        reservations: [...(userData.reservations || []), newReservation]
      };

      // Actualizar en localStorage
      updateUser(userData.email, updatedUser);
      
      // Actualizar estado local
      setUserData(updatedUser);

      return true;
    } catch (error) {
      console.error('Error al reservar:', error);
      return false;
    }
  };

  const handleCancelReservation = (reservationId) => {
    if (!isAuthenticated || !userData) return;

    try {
      // Crear nuevo estado de usuario con la reserva cancelada
      const updatedUser = {
        ...userData,
        reservations: userData.reservations.filter(res => res.id !== reservationId)
      };

      // Actualizar en localStorage
      updateUser(userData.email, updatedUser);
      
      // Actualizar estado local
      setUserData(updatedUser);
    } catch (error) {
      console.error('Error al cancelar reserva:', error);
    }
  };

  const handleFavoriteToggle = (updatedUser) => {
    setUserData(updatedUser);
  };

  return (
    <Router>
      <div className="app">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          userData={userData} 
          onLogout={handleLogout}
        />
        
        <div className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={<Home isAuthenticated={isAuthenticated} userData={userData} onFavoriteToggle={handleFavoriteToggle} />} 
            />
            <Route 
              path="/login" 
              element={<Login onLogin={handleLogin} />} 
            />
            <Route 
              path="/registro" 
              element={<Register />} 
            />
            <Route 
              path="/libro/:id" 
              element={
                <BookDetail 
                  isAuthenticated={isAuthenticated}
                  onReserve={handleReserveBook}
                  userData={userData}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              } 
            />
            <Route 
              path="/categoria/:categoria/:subcategoria" 
              element={
                <SubcategoryBooks 
                  isAuthenticated={isAuthenticated} 
                  userData={userData}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              } 
            />
            <Route 
              path="/cuenta" 
              element={<Account isAuthenticated={isAuthenticated} userData={userData} />} 
            />
            <Route 
              path="/reservas" 
              element={
                <Reservations 
                  isAuthenticated={isAuthenticated} 
                  userData={userData}
                  onCancelReservation={handleCancelReservation}
                />
              } 
            />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
