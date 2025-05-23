import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../../FavoriteButton';

// Exportar el array de libros
export const books = [
  {
    id: 37,
    title: 'Cosmos',
    author: 'Carl Sagan',
    image: '/images/astronomia1.webp',
    category: 'Astronomía General'
  },
  {
    id: 38,
    title: 'Astrofísica para Gente con Prisa',
    author: 'Neil deGrasse Tyson',
    image: '/images/astronomia2.webp',
    category: 'Astrofísica'
  },
  {
    id: 39,
    title: 'Breve Historia del Tiempo',
    author: 'Stephen Hawking',
    image: '/images/astronomia3.jpg',
    category: 'Cosmología'
  },
  {
    id: 40,
    title: 'Manual de Astronomía Práctica',
    author: 'Antonio Arias',
    image: '/images/astronomia4.webp',
    category: 'Astronomía Práctica'
  },
  {
    id: 41,
    title: 'Guía del Sistema Solar',
    author: 'Marcus Chown',
    image: '/images/astronomia5.jpg',
    category: 'Sistema Solar'
  },
  {
    id: 42,
    title: 'Evolución Estelar',
    author: 'Martin Rees',
    image: '/images/astronomia6.jpg',
    category: 'Astrofísica Estelar'
  },
  {
    id: 43,
    title: 'Agujeros Negros y Tiempo-Espacio',
    author: 'Kip S. Thorne',
    image: '/images/astronomia1.webp',
    category: 'Relatividad General'
  },
  {
    id: 44,
    title: 'Atlas de las Constelaciones',
    author: 'José Luis Comellas',
    image: '/images/astronomia2.webp',
    category: 'Astronomía Observacional'
  },
  {
    id: 45,
    title: 'Galaxias y Estructura Cósmica',
    author: 'Linda S. Sparke',
    image: '/images/astronomia3.jpg',
    category: 'Astronomía Galáctica'
  },
  {
    id: 46,
    title: 'Planetas Extrasolares',
    author: 'Michael Perryman',
    image: '/images/astronomia4.webp',
    category: 'Exoplanetas'
  },
  {
    id: 47,
    title: 'Radioastronomía',
    author: 'Bernard F. Burke',
    image: '/images/astronomia5.jpg',
    category: 'Radioastronomía'
  },
  {
    id: 48,
    title: 'Astrobiología',
    author: 'Charles S. Cockell',
    image: '/images/astronomia6.jpg',
    category: 'Astrobiología'
  }
];

const AstronomiaBooks = ({ isAuthenticated, userData, onFavoriteToggle }) => {
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
      <h1 className="subcategory-title">ASTRONOMÍA</h1>
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

export default AstronomiaBooks; 