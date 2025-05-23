import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../../FavoriteButton';

// Exportar el array de libros
export const books = [
  {
    id: 13,
    title: 'Química Orgánica',
    author: 'John McMurry',
    image: '/images/quimica1.webp',
    category: 'Química Orgánica'
  },
  {
    id: 14,
    title: 'Principios de Química',
    author: 'Peter Atkins',
    image: '/images/quimica2.webp',
    category: 'Química General'
  },
  {
    id: 15,
    title: 'Química Inorgánica',
    author: 'Catherine Housecroft',
    image: '/images/quimica3.jpg',
    category: 'Química Inorgánica'
  },
  {
    id: 16,
    title: 'Química Analítica',
    author: 'Daniel C. Harris',
    image: '/images/quimica4.jpg',
    category: 'Química Analítica'
  },
  {
    id: 17,
    title: 'Fisicoquímica',
    author: 'Peter Atkins',
    image: '/images/quimica5.webp',
    category: 'Fisicoquímica'
  },
  {
    id: 18,
    title: 'Química Ambiental',
    author: 'Colin Baird',
    image: '/images/quimica6.jpg',
    category: 'Química Ambiental'
  },
  {
    id: 19,
    title: 'Química de los Polímeros',
    author: 'Paul C. Hiemenz',
    image: '/images/quimica1.webp',
    category: 'Química de Materiales'
  },
  {
    id: 20,
    title: 'Química Cuántica',
    author: 'Ira N. Levine',
    image: '/images/quimica2.webp',
    category: 'Química Cuántica'
  },
  {
    id: 21,
    title: 'Química Farmacéutica',
    author: 'Graham L. Patrick',
    image: '/images/quimica3.jpg',
    category: 'Química Farmacéutica'
  },
  {
    id: 22,
    title: 'Química de los Alimentos',
    author: 'H.D. Belitz',
    image: '/images/quimica4.jpg',
    category: 'Química de Alimentos'
  },
  {
    id: 23,
    title: 'Química Nuclear',
    author: 'Gerhart Friedlander',
    image: '/images/quimica6.jpg',
    category: 'Química Nuclear'
  },
  {
    id: 24,
    title: 'Química Industrial',
    author: 'James A. Kent',
    image: '/images/quimica5.webp',
    category: 'Química Industrial'
  }
];

const QuimicaBooks = ({ isAuthenticated, userData, onFavoriteToggle }) => {
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
      <h1 className="subcategory-title">QUÍMICA</h1>
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

export default QuimicaBooks; 