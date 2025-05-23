import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../FavoriteButton';
import { books as terrorBooks } from '../SubcategoryBooks/Categories/TerrorBooks';
import { books as romanceBooks } from '../SubcategoryBooks/Categories/RomanceBooks';
import { books as fantasiaBooks } from '../SubcategoryBooks/Categories/FantasiaBooks';
import './CategoryBooks.css';

const LiteraturaBooks = ({ isAuthenticated, userData, onFavoriteToggle }) => {
  const navigate = useNavigate();
  const defaultBookCover = '/images/default-book.jpg';

  // Combinar todos los libros de literatura
  const allLiteratureBooks = [
    ...terrorBooks,
    ...romanceBooks,
    ...fantasiaBooks
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
      <h1 className="subcategory-title">LITERATURA</h1>
      <div className="books-grid">
        {allLiteratureBooks.map((book) => (
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

export default LiteraturaBooks; 