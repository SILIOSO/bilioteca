import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../../FavoriteButton';
import './BiologiaBooks.css';

// Exportar el array de libros
export const books = [
  {
    id: 301,
    title: 'It',
    author: 'Stephen King',
    image: '/images/default-book.jpg',
    category: 'Terror Psicológico'
  },
  {
    id: 302,
    title: 'Drácula',
    author: 'Bram Stoker',
    image: '/images/default-book.jpg',
    category: 'Terror Gótico'
  },
  {
    id: 303,
    title: 'El Resplandor',
    author: 'Stephen King',
    image: '/images/default-book.jpg',
    category: 'Terror Sobrenatural'
  },
  {
    id: 304,
    title: 'Frankenstein',
    author: 'Mary Shelley',
    image: '/images/default-book.jpg',
    category: 'Terror Gótico'
  },
  {
    id: 305,
    title: 'El Exorcista',
    author: 'William Peter Blatty',
    image: '/images/default-book.jpg',
    category: 'Terror Sobrenatural'
  },
  {
    id: 306,
    title: 'La Llamada de Cthulhu',
    author: 'H.P. Lovecraft',
    image: '/images/default-book.jpg',
    category: 'Terror Cósmico'
  },
  {
    id: 307,
    title: 'El Silencio de los Corderos',
    author: 'Thomas Harris',
    image: '/images/default-book.jpg',
    category: 'Terror Psicológico'
  },
  {
    id: 308,
    title: 'Casa de Hojas',
    author: 'Mark Z. Danielewski',
    image: '/images/default-book.jpg',
    category: 'Terror Experimental'
  },
  {
    id: 309,
    title: 'El Extraño Caso del Dr. Jekyll y Mr. Hyde',
    author: 'Robert Louis Stevenson',
    image: '/images/default-book.jpg',
    category: 'Terror Gótico'
  },
  {
    id: 310,
    title: 'El Cuervo',
    author: 'Edgar Allan Poe',
    image: '/images/default-book.jpg',
    category: 'Terror Gótico'
  }
];

const TerrorBooks = ({ isAuthenticated, userData, onFavoriteToggle }) => {
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
      <h1 className="subcategory-title">TERROR</h1>
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

export default TerrorBooks; 