import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../../FavoriteButton';

// Exportar el array de libros
export const books = [
  {
    id: 25,
    title: 'Física Universitaria',
    author: 'Young & Freedman',
    image: '/images/default-book.jpg',
    category: 'Física General'
  },
  {
    id: 26,
    title: 'Mecánica Cuántica',
    author: 'Richard Feynman',
    image: '/images/default-book.jpg',
    category: 'Física Cuántica'
  },
  {
    id: 27,
    title: 'Teoría de la Relatividad',
    author: 'Albert Einstein',
    image: '/images/default-book.jpg',
    category: 'Relatividad'
  },
  {
    id: 28,
    title: 'Termodinámica',
    author: 'Yunus A. Cengel',
    image: '/images/default-book.jpg',
    category: 'Termodinámica'
  },
  {
    id: 29,
    title: 'Electromagnetismo',
    author: 'David J. Griffiths',
    image: '/images/default-book.jpg',
    category: 'Electromagnetismo'
  },
  {
    id: 30,
    title: 'Física Nuclear',
    author: 'Kenneth S. Krane',
    image: '/images/default-book.jpg',
    category: 'Física Nuclear'
  },
  {
    id: 31,
    title: 'Física de Estado Sólido',
    author: 'Neil W. Ashcroft',
    image: '/images/default-book.jpg',
    category: 'Estado Sólido'
  },
  {
    id: 32,
    title: 'Mecánica Clásica',
    author: 'John R. Taylor',
    image: '/images/default-book.jpg',
    category: 'Mecánica'
  },
  {
    id: 33,
    title: 'Óptica',
    author: 'Eugene Hecht',
    image: '/images/default-book.jpg',
    category: 'Óptica'
  },
  {
    id: 34,
    title: 'Física de Partículas',
    author: 'Martin Thomson',
    image: '/images/default-book.jpg',
    category: 'Física de Partículas'
  },
  {
    id: 35,
    title: 'Física Estadística',
    author: 'Frederick Reif',
    image: '/images/default-book.jpg',
    category: 'Física Estadística'
  },
  {
    id: 36,
    title: 'Física Computacional',
    author: 'Nicholas J. Giordano',
    image: '/images/default-book.jpg',
    category: 'Física Computacional'
  }
];

const FisicaBooks = ({ isAuthenticated, userData, onFavoriteToggle }) => {
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
      <h1 className="subcategory-title">FÍSICA</h1>
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

export default FisicaBooks; 