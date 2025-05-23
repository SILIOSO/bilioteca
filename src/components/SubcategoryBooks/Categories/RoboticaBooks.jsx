import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../../FavoriteButton';
import './BiologiaBooks.css';

// Exportar el array de libros
export const books = [
  {
    id: 111,
    title: 'Introduction to Robotics',
    author: 'John J. Craig',
    image: '/images/default-book.jpg',
    category: 'Robótica General'
  },
  {
    id: 112,
    title: 'Robot Programming',
    author: 'Cameron Hughes',
    image: '/images/default-book.jpg',
    category: 'Programación de Robots'
  },
  {
    id: 113,
    title: 'Probabilistic Robotics',
    author: 'Sebastian Thrun',
    image: '/images/default-book.jpg',
    category: 'Robótica Avanzada'
  },
  {
    id: 114,
    title: 'Modern Robotics',
    author: 'Kevin M. Lynch',
    image: '/images/default-book.jpg',
    category: 'Robótica Moderna'
  },
  {
    id: 115,
    title: 'Robot Dynamics and Control',
    author: 'Mark W. Spong',
    image: '/images/default-book.jpg',
    category: 'Control de Robots'
  },
  {
    id: 116,
    title: 'ROS Robotics Projects',
    author: 'Lentin Joseph',
    image: '/images/default-book.jpg',
    category: 'ROS'
  },
  {
    id: 117,
    title: 'Artificial Intelligence for Robotics',
    author: 'Francis X. Govers',
    image: '/images/default-book.jpg',
    category: 'IA en Robótica'
  },
  {
    id: 118,
    title: 'Industrial Robotics',
    author: 'Harry H. Poole',
    image: '/images/default-book.jpg',
    category: 'Robótica Industrial'
  },
  {
    id: 119,
    title: 'Mobile Robotics',
    author: 'Alonzo Kelly',
    image: '/images/default-book.jpg',
    category: 'Robótica Móvil'
  },
  {
    id: 120,
    title: 'Robótica Biomimética',
    author: 'Carlos A. Cruz',
    image: '/images/default-book.jpg',
    category: 'Robótica Bioinspirada'
  }
];

const RoboticaBooks = ({ isAuthenticated, userData, onFavoriteToggle }) => {
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
      <h1 className="subcategory-title">ROBÓTICA</h1>
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

export default RoboticaBooks; 