import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../FavoriteButton';
import { books as informaticaBooks } from '../SubcategoryBooks/Categories/InformaticaBooks';
import { books as roboticaBooks } from '../SubcategoryBooks/Categories/RoboticaBooks';
import { books as electronicaBooks } from '../SubcategoryBooks/Categories/ElectronicaBooks';
import './CategoryBooks.css';

const TecnologiaBooks = ({ isAuthenticated, userData, onFavoriteToggle }) => {
  const navigate = useNavigate();
  const defaultBookCover = '/images/default-book.jpg';

  // Combinar todos los libros de tecnología
  const allTechnologyBooks = [
    ...informaticaBooks,
    ...roboticaBooks,
    ...electronicaBooks
  ];

  const handleBookClick = (bookId) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate(`/libro/${bookId}`);
    }
  };

  return (
    <div className="subcategory-container">
      <h1 className="subcategory-title">TECNOLOGÍA</h1>
      <div className="books-grid">
        {allTechnologyBooks.map((book) => (
          <div 
            key={book.id} 
            className="book-card"
            onClick={() => handleBookClick(book.id)}
          >
            <div className="book-image">
              <img 
                src={book.image} 
                alt={book.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultBookCover;
                }}
              />
              {isAuthenticated && (
                <FavoriteButton
                  bookId={book.id}
                  isFavorite={userData?.favorites?.includes(book.id)}
                  userEmail={userData?.email}
                  onToggle={onFavoriteToggle}
                />
              )}
            </div>
            <div className="book-info">
              <h3>{book.title}</h3>
              <p className="author">{book.author}</p>
              <p className="category">{book.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TecnologiaBooks; 