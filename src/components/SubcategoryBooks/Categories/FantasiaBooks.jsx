import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../../FavoriteButton';
import './BiologiaBooks.css';

// Exportar el array de libros
export const books = [
  {
    id: 321,
    title: 'El Señor de los Anillos',
    author: 'J.R.R. Tolkien',
    image: '/images/default-book.jpg',
    category: 'Alta Fantasía'
  },
  {
    id: 322,
    title: 'Harry Potter y la Piedra Filosofal',
    author: 'J.K. Rowling',
    image: '/images/default-book.jpg',
    category: 'Fantasía Juvenil'
  },
  {
    id: 323,
    title: 'Juego de Tronos',
    author: 'George R.R. Martin',
    image: '/images/default-book.jpg',
    category: 'Fantasía Épica'
  },
  {
    id: 324,
    title: 'El Nombre del Viento',
    author: 'Patrick Rothfuss',
    image: '/images/default-book.jpg',
    category: 'Fantasía Épica'
  },
  {
    id: 325,
    title: 'Las Crónicas de Narnia',
    author: 'C.S. Lewis',
    image: '/images/default-book.jpg',
    category: 'Fantasía Juvenil'
  },
  {
    id: 326,
    title: 'El Último Deseo',
    author: 'Andrzej Sapkowski',
    image: '/images/default-book.jpg',
    category: 'Fantasía Oscura'
  },
  {
    id: 327,
    title: 'Mistborn',
    author: 'Brandon Sanderson',
    image: '/images/default-book.jpg',
    category: 'Fantasía Épica'
  },
  {
    id: 328,
    title: 'American Gods',
    author: 'Neil Gaiman',
    image: '/images/default-book.jpg',
    category: 'Fantasía Contemporánea'
  },
  {
    id: 329,
    title: 'La Historia Interminable',
    author: 'Michael Ende',
    image: '/images/default-book.jpg',
    category: 'Fantasía Juvenil'
  },
  {
    id: 330,
    title: 'El Ciclo de la Puerta de la Muerte',
    author: 'Margaret Weis',
    image: '/images/default-book.jpg',
    category: 'Fantasía Épica'
  }
];

const FantasiaBooks = ({ isAuthenticated, userData, onFavoriteToggle }) => {
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
      <h1 className="subcategory-title">FANTASÍA</h1>
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

export default FantasiaBooks; 