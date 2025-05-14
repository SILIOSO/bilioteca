import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Importación de páginas
import HomePage from './pages/HomePage';
import BookDetailPage from './pages/BookDetailPage';
import ReservationsPage from './pages/ReservationsPage';
import CategoriesPage from './pages/CategoriesPage';

// Componente principal de la aplicación
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<BookDetailPage />} />
          <Route path="/reservas" element={<ReservationsPage />} />
          <Route path="/categorias" element={<CategoriesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;