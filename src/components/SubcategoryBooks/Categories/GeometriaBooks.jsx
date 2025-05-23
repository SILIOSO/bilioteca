import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../../FavoriteButton';
import './BiologiaBooks.css';

// Exportar el array de libros
export const books = [
  {
    id: 211,
    title: 'Geometría Euclidiana',
    author: 'Richard J. Trudeau',
    image: '/images/default-book.jpg',
    category: 'Geometría Básica'
  },
  {
    id: 212,
    title: 'Geometría Analítica',
    author: 'Charles H. Lehmann',
    image: '/images/default-book.jpg',
    category: 'Geometría Analítica'
  },
  {
    id: 213,
    title: 'Geometría Diferencial',
    author: 'Manfredo P. do Carmo',
    image: '/images/default-book.jpg',
    category: 'Geometría Diferencial'
  },
  {
    id: 214,
    title: 'Geometría Proyectiva',
    author: 'H.S.M. Coxeter',
    image: '/images/default-book.jpg',
    category: 'Geometría Proyectiva'
  },
  {
    id: 215,
    title: 'Geometría Algebraica',
    author: 'Robin Hartshorne',
    image: '/images/default-book.jpg',
    category: 'Geometría Algebraica'
  },
  {
    id: 216,
    title: 'Geometría No Euclidiana',
    author: 'Marvin J. Greenberg',
    image: '/images/default-book.jpg',
    category: 'Geometría No Euclidiana'
  },
  {
    id: 217,
    title: 'Topología Geométrica',
    author: 'Morris W. Hirsch',
    image: '/images/default-book.jpg',
    category: 'Topología'
  },
  {
    id: 218,
    title: 'Geometría Computacional',
    author: 'Mark de Berg',
    image: '/images/default-book.jpg',
    category: 'Geometría Computacional'
  },
  {
    id: 219,
    title: 'Geometría Fractal',
    author: 'Benoit B. Mandelbrot',
    image: '/images/default-book.jpg',
    category: 'Geometría Fractal'
  },
  {
    id: 220,
    title: 'Geometría Riemanniana',
    author: 'John M. Lee',
    image: '/images/default-book.jpg',
    category: 'Geometría Riemanniana'
  }
];

const GeometriaBooks = ({ isAuthenticated, userData, onFavoriteToggle }) => {
  const navigate = useNavigate();
  const defaultBookCover = '/images/default-book.jpg';

  const handleBookClick = (bookId) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate(`/libro/${bookId}`);
    }
  };

  return (
    <div className="subcategory-container">
      <h1 className="subcategory-title">GEOMETRÍA</h1>
      <div className="books-grid">
        {books.map((book) => (
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

export default GeometriaBooks; 