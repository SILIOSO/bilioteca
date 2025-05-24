import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../FavoriteButton';
import { books as algebraBooks } from '../SubcategoryBooks/Categories/AlgebraBooks';
import { books as geometriaBooks } from '../SubcategoryBooks/Categories/GeometriaBooks';
import { books as calculoBooks } from '../SubcategoryBooks/Categories/CalculoBooks';
import './CategoryBooks.css';

const MatematicasBooks = ({ isAuthenticated, userData, onFavoriteToggle }) => {
  const navigate = useNavigate();
  const defaultBookCover = '/images/default-book.jpg';

  const subcategories = [
    {
      title: 'ÁLGEBRA',
      books: algebraBooks
    },
    {
      title: 'GEOMETRÍA',
      books: geometriaBooks
    },
    {
      title: 'CÁLCULO',
      books: calculoBooks
    }
  ];

  const handleBookClick = (bookId) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate(`/libro/${bookId}`);
    }
  };

  return (
    <div className="categories-container">
      {subcategories.map((subcategory) => (
        <div key={subcategory.title} className="subcategory-section">
          <h2>{subcategory.title}</h2>
          <div className="books-grid">
            {subcategory.books.map((book) => (
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
      ))}
    </div>
  );
};

export default MatematicasBooks; 