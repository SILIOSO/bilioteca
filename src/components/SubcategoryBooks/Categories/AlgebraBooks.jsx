import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../../FavoriteButton';
import './BiologiaBooks.css';

// Exportar el array de libros
export const books = [
  {
    id: 201,
    title: 'Álgebra Lineal',
    author: 'Stanley I. Grossman',
    image: '/images/default-book.jpg',
    category: 'Álgebra Lineal'
  },
  {
    id: 202,
    title: 'Álgebra Abstracta',
    author: 'Joseph A. Gallian',
    image: '/images/default-book.jpg',
    category: 'Álgebra Abstracta'
  },
  {
    id: 203,
    title: 'Álgebra Superior',
    author: 'Murray R. Spiegel',
    image: '/images/default-book.jpg',
    category: 'Álgebra Superior'
  },
  {
    id: 204,
    title: 'Teoría de Grupos',
    author: 'Joseph Rotman',
    image: '/images/default-book.jpg',
    category: 'Teoría de Grupos'
  },
  {
    id: 205,
    title: 'Matrices y Determinantes',
    author: 'Frank Ayres',
    image: '/images/default-book.jpg',
    category: 'Matrices'
  },
  {
    id: 206,
    title: 'Álgebra Moderna',
    author: 'I. N. Herstein',
    image: '/images/default-book.jpg',
    category: 'Álgebra Moderna'
  },
  {
    id: 207,
    title: 'Teoría de Anillos',
    author: 'Richard S. Pierce',
    image: '/images/default-book.jpg',
    category: 'Teoría de Anillos'
  },
  {
    id: 208,
    title: 'Álgebra Computacional',
    author: 'Keith O. Geddes',
    image: '/images/default-book.jpg',
    category: 'Álgebra Computacional'
  },
  {
    id: 209,
    title: 'Teoría de Galois',
    author: 'Emil Artin',
    image: '/images/default-book.jpg',
    category: 'Teoría de Galois'
  },
  {
    id: 210,
    title: 'Álgebra Homológica',
    author: 'Charles A. Weibel',
    image: '/images/default-book.jpg',
    category: 'Álgebra Homológica'
  }
];

const AlgebraBooks = ({ isAuthenticated, userData, onFavoriteToggle }) => {
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
      <h1 className="subcategory-title">ÁLGEBRA</h1>
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

export default AlgebraBooks; 