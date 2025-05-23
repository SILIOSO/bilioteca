import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../../FavoriteButton';
import './BiologiaBooks.css';

// Exportar el array de libros
export const books = [
  {
    id: 101,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    image: '/images/default-book.jpg',
    category: 'Programación'
  },
  {
    id: 102,
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    image: '/images/default-book.jpg',
    category: 'Algoritmos'
  },
  {
    id: 103,
    title: 'Design Patterns',
    author: 'Erich Gamma',
    image: '/images/default-book.jpg',
    category: 'Ingeniería de Software'
  },
  {
    id: 104,
    title: 'Database System Concepts',
    author: 'Abraham Silberschatz',
    image: '/images/default-book.jpg',
    category: 'Bases de Datos'
  },
  {
    id: 105,
    title: 'Computer Networks',
    author: 'Andrew S. Tanenbaum',
    image: '/images/default-book.jpg',
    category: 'Redes'
  },
  {
    id: 106,
    title: 'Operating System Concepts',
    author: 'Abraham Silberschatz',
    image: '/images/default-book.jpg',
    category: 'Sistemas Operativos'
  },
  {
    id: 107,
    title: 'Artificial Intelligence: A Modern Approach',
    author: 'Stuart Russell',
    image: '/images/default-book.jpg',
    category: 'Inteligencia Artificial'
  },
  {
    id: 108,
    title: 'Computer Security: Principles and Practice',
    author: 'William Stallings',
    image: '/images/default-book.jpg',
    category: 'Seguridad Informática'
  },
  {
    id: 109,
    title: 'Computer Organization and Design',
    author: 'David A. Patterson',
    image: '/images/default-book.jpg',
    category: 'Arquitectura de Computadores'
  },
  {
    id: 110,
    title: 'Software Engineering',
    author: 'Ian Sommerville',
    image: '/images/default-book.jpg',
    category: 'Ingeniería de Software'
  }
];

const InformaticaBooks = ({ isAuthenticated, userData, onFavoriteToggle }) => {
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
      <h1 className="subcategory-title">INFORMÁTICA</h1>
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

export default InformaticaBooks; 