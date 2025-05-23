import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../../FavoriteButton';
import './BiologiaBooks.css';

// Exportar el array de libros
export const books = [
  {
    id: 311,
    title: 'Orgullo y Prejuicio',
    author: 'Jane Austen',
    image: '/images/default-book.jpg',
    category: 'Romance Clásico'
  },
  {
    id: 312,
    title: 'Cumbres Borrascosas',
    author: 'Emily Brontë',
    image: '/images/default-book.jpg',
    category: 'Romance Gótico'
  },
  {
    id: 313,
    title: 'Romeo y Julieta',
    author: 'William Shakespeare',
    image: '/images/default-book.jpg',
    category: 'Romance Trágico'
  },
  {
    id: 314,
    title: 'El Amor en los Tiempos del Cólera',
    author: 'Gabriel García Márquez',
    image: '/images/default-book.jpg',
    category: 'Romance Literario'
  },
  {
    id: 315,
    title: 'Los Puentes de Madison',
    author: 'Robert James Waller',
    image: '/images/default-book.jpg',
    category: 'Romance Contemporáneo'
  },
  {
    id: 316,
    title: 'El Cuaderno de Noah',
    author: 'Nicholas Sparks',
    image: '/images/default-book.jpg',
    category: 'Romance Contemporáneo'
  },
  {
    id: 317,
    title: 'Anna Karenina',
    author: 'León Tolstói',
    image: '/images/default-book.jpg',
    category: 'Romance Clásico'
  },
  {
    id: 318,
    title: 'Bajo la Misma Estrella',
    author: 'John Green',
    image: '/images/default-book.jpg',
    category: 'Romance Juvenil'
  },
  {
    id: 319,
    title: 'Jane Eyre',
    author: 'Charlotte Brontë',
    image: '/images/default-book.jpg',
    category: 'Romance Gótico'
  },
  {
    id: 320,
    title: 'Yo Antes de Ti',
    author: 'Jojo Moyes',
    image: '/images/default-book.jpg',
    category: 'Romance Contemporáneo'
  }
];

const RomanceBooks = ({ isAuthenticated, userData, onFavoriteToggle }) => {
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
      <h1 className="subcategory-title">ROMANCE</h1>
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

export default RomanceBooks; 