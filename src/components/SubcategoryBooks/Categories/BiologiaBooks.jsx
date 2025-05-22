import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../../FavoriteButton';
import './BiologiaBooks.css';

// Exportar el array de libros
export const books = [
  {
    id: 1,
    title: 'Biología Molecular de la Célula',
    author: 'Bruce Alberts',
    image: '/images/default-book.jpg',
    category: 'Biología Celular'
  },
  {
    id: 2,
    title: 'El Origen de las Especies',
    author: 'Charles Darwin',
    image: '/images/default-book.jpg',
    category: 'Evolución'
  },
  {
    id: 3,
    title: 'Principios de Neurociencia',
    author: 'Eric R. Kandel',
    image: '/images/default-book.jpg',
    category: 'Neurobiología'
  },
  {
    id: 4,
    title: 'Genética: Un Enfoque Conceptual',
    author: 'Benjamin A. Pierce',
    image: '/images/default-book.jpg',
    category: 'Genética'
  },
  {
    id: 5,
    title: 'Fisiología Humana',
    author: 'Dee Unglaub Silverthorn',
    image: '/images/default-book.jpg',
    category: 'Fisiología'
  },
  {
    id: 6,
    title: 'Microbiología',
    author: 'Michael T. Madigan',
    image: '/images/default-book.jpg',
    category: 'Microbiología'
  },
  {
    id: 7,
    title: 'Biología de Campbell',
    author: 'Neil A. Campbell',
    image: '/images/default-book.jpg',
    category: 'Biología General'
  },
  {
    id: 8,
    title: 'Atlas de Anatomía Humana',
    author: 'Frank H. Netter',
    image: '/images/default-book.jpg',
    category: 'Anatomía'
  },
  {
    id: 9,
    title: 'Bioquímica',
    author: 'Lehninger',
    image: '/images/default-book.jpg',
    category: 'Bioquímica'
  },
  {
    id: 10,
    title: 'Inmunología Celular y Molecular',
    author: 'Abul K. Abbas',
    image: '/images/default-book.jpg',
    category: 'Inmunología'
  },
  {
    id: 11,
    title: 'Botánica: Introducción a la Biología Vegetal',
    author: 'Jesús Izco',
    image: '/images/default-book.jpg',
    category: 'Botánica'
  },
  {
    id: 12,
    title: 'Zoología de los Invertebrados',
    author: 'Richard C. Brusca',
    image: '/images/default-book.jpg',
    category: 'Zoología'
  }
];

const BiologiaBooks = ({ isAuthenticated, userData, onFavoriteToggle }) => {
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
      <h1 className="subcategory-title">BIOLOGÍA</h1>
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

export default BiologiaBooks; 