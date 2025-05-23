import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../../FavoriteButton';
import './BiologiaBooks.css';

// Exportar el array de libros
export const books = [
  {
    id: 221,
    title: 'Cálculo de Una Variable',
    author: 'James Stewart',
    image: '/images/default-book.jpg',
    category: 'Cálculo Diferencial'
  },
  {
    id: 222,
    title: 'Cálculo Multivariable',
    author: 'James Stewart',
    image: '/images/default-book.jpg',
    category: 'Cálculo Multivariable'
  },
  {
    id: 223,
    title: 'Cálculo Vectorial',
    author: 'Jerrold E. Marsden',
    image: '/images/default-book.jpg',
    category: 'Cálculo Vectorial'
  },
  {
    id: 224,
    title: 'Análisis Matemático',
    author: 'Tom M. Apostol',
    image: '/images/default-book.jpg',
    category: 'Análisis'
  },
  {
    id: 225,
    title: 'Ecuaciones Diferenciales',
    author: 'Dennis G. Zill',
    image: '/images/default-book.jpg',
    category: 'Ecuaciones Diferenciales'
  },
  {
    id: 226,
    title: 'Variable Compleja',
    author: 'Murray R. Spiegel',
    image: '/images/default-book.jpg',
    category: 'Variable Compleja'
  },
  {
    id: 227,
    title: 'Análisis Funcional',
    author: 'Walter Rudin',
    image: '/images/default-book.jpg',
    category: 'Análisis Funcional'
  },
  {
    id: 228,
    title: 'Cálculo Numérico',
    author: 'Richard L. Burden',
    image: '/images/default-book.jpg',
    category: 'Cálculo Numérico'
  },
  {
    id: 229,
    title: 'Análisis Real',
    author: 'Halsey Royden',
    image: '/images/default-book.jpg',
    category: 'Análisis Real'
  },
  {
    id: 230,
    title: 'Series y Transformadas',
    author: 'Murray R. Spiegel',
    image: '/images/default-book.jpg',
    category: 'Series'
  }
];

const CalculoBooks = ({ isAuthenticated, userData, onFavoriteToggle }) => {
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
      <h1 className="subcategory-title">CÁLCULO</h1>
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

export default CalculoBooks; 