import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../../FavoriteButton';
import './BiologiaBooks.css';

// Exportar el array de libros
export const books = [
  {
    id: 121,
    title: 'Fundamentos de Circuitos Eléctricos',
    author: 'Charles K. Alexander',
    image: '/images/default-book.jpg',
    category: 'Circuitos'
  },
  {
    id: 122,
    title: 'Microelectronic Circuits',
    author: 'Adel S. Sedra',
    image: '/images/default-book.jpg',
    category: 'Microelectrónica'
  },
  {
    id: 123,
    title: 'Digital Design',
    author: 'M. Morris Mano',
    image: '/images/default-book.jpg',
    category: 'Diseño Digital'
  },
  {
    id: 124,
    title: 'The Art of Electronics',
    author: 'Paul Horowitz',
    image: '/images/default-book.jpg',
    category: 'Electrónica General'
  },
  {
    id: 125,
    title: 'Power Electronics',
    author: 'Daniel W. Hart',
    image: '/images/default-book.jpg',
    category: 'Electrónica de Potencia'
  },
  {
    id: 126,
    title: 'Practical Electronics for Inventors',
    author: 'Paul Scherz',
    image: '/images/default-book.jpg',
    category: 'Electrónica Práctica'
  },
  {
    id: 127,
    title: 'RF Microelectronics',
    author: 'Behzad Razavi',
    image: '/images/default-book.jpg',
    category: 'RF y Microondas'
  },
  {
    id: 128,
    title: 'Optoelectronics & Photonics',
    author: 'S.O. Kasap',
    image: '/images/default-book.jpg',
    category: 'Optoelectrónica'
  },
  {
    id: 129,
    title: 'Analog Integrated Circuit Design',
    author: 'Tony Chan Carusone',
    image: '/images/default-book.jpg',
    category: 'Circuitos Integrados'
  },
  {
    id: 130,
    title: 'Electronic Devices and Circuit Theory',
    author: 'Robert Boylestad',
    image: '/images/default-book.jpg',
    category: 'Teoría de Circuitos'
  }
];

const ElectronicaBooks = ({ isAuthenticated, userData, onFavoriteToggle }) => {
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
      <h1 className="subcategory-title">ELECTRÓNICA</h1>
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

export default ElectronicaBooks; 