import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById } from '../../utils/bookService';
import './BookDetail.css';

const BookDetail = ({ isAuthenticated, onReserve, userData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservaExitosa, setReservaExitosa] = useState(false);
  const [error, setError] = useState('');
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    try {
      const book = getBookById(id);
      setBookDetails(book);
    } catch (err) {
      setError('Libro no encontrado');
      console.error(err);
    }
  }, [id]);

  // Verificar si el libro ya está reservado
  const isBookReserved = userData?.reservations?.some(
    reservation => reservation.book.id === id
  );

  const handleReserve = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isBookReserved) {
      setError('Este libro ya está en tus reservas');
      return;
    }

    if (!bookDetails) {
      setError('No se puede reservar el libro en este momento');
      return;
    }

    // Intentar reservar el libro
    const success = onReserve(bookDetails);
    
    if (success) {
      setReservaExitosa(true);
      setError('');
      
      // Después de 3 segundos, redirigimos a la página de reservas
      setTimeout(() => {
        navigate('/reservas');
      }, 3000);
    } else {
      setError('No se pudo realizar la reserva. Por favor, intenta de nuevo.');
    }
  };

  if (!bookDetails) {
    return (
      <div className="book-detail-container">
        <div className="book-detail-card">
          <div className="error-message">
            {error || 'Cargando...'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-detail-container">
      <div className="book-detail-card">
        <div className="book-detail-image">
          <img src={bookDetails.image} alt={bookDetails.title} />
        </div>
        
        <div className="book-detail-info">
          <h2>{bookDetails.title}</h2>
          <h3>Autor: {bookDetails.author}</h3>
          <h3>Editorial: {bookDetails.editorial}</h3>
          <h3>Categoría: {bookDetails.category}</h3>
          
          <div className="book-synopsis">
            <h3>Sinopsis:</h3>
            <p>{bookDetails.synopsis}</p>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          {reservaExitosa ? (
            <div className="reserva-exitosa">
              ¡Libro reservado con éxito! 
              Serás redirigido a tus reservas en unos segundos...
            </div>
          ) : (
            <button 
              className={`reserve-button ${isBookReserved ? 'reserved' : ''}`}
              onClick={handleReserve}
              disabled={isBookReserved}
            >
              {!isAuthenticated ? 'INICIAR SESIÓN PARA RESERVAR' : 
               isBookReserved ? 'LIBRO YA RESERVADO' : 'RESERVAR'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail; 