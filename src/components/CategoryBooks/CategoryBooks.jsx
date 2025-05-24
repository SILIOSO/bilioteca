import React from 'react';
import { useNavigate } from 'react-router-dom';
import { books as biologiaBooks } from '../SubcategoryBooks/Categories/BiologiaBooks';
import { books as quimicaBooks } from '../SubcategoryBooks/Categories/QuimicaBooks';
import { books as fisicaBooks } from '../SubcategoryBooks/Categories/FisicaBooks';
import { books as astronomiaBooks } from '../SubcategoryBooks/Categories/AstronomiaBooks';
import { books as informaticaBooks } from '../SubcategoryBooks/Categories/InformaticaBooks';
import { books as roboticaBooks } from '../SubcategoryBooks/Categories/RoboticaBooks';
import { books as electronicaBooks } from '../SubcategoryBooks/Categories/ElectronicaBooks';
import './CategoryBooks.css';

const CategoryBooks = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleBookClick = (bookId) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate(`/libro/${bookId}`);
    }
  };

  const defaultBookCover = '/images/default-book.jpg';

  const categories = {
    ciencia: {
      title: 'CIENCIAS',
      subcategories: [
        {
          title: 'BIOLOGÍA',
          books: biologiaBooks
        },
        {
          title: 'QUÍMICA',
          books: quimicaBooks
        },
        {
          title: 'FÍSICA',
          books: fisicaBooks
        },
        {
          title: 'ASTRONOMÍA',
          books: astronomiaBooks
        }
      ]
    },
    tecnologia: {
      title: 'TECNOLOGÍA',
      subcategories: [
        {
          title: 'INFORMÁTICA',
          books: informaticaBooks
        },
        {
          title: 'ROBÓTICA',
          books: roboticaBooks
        },
        {
          title: 'ELECTRÓNICA',
          books: electronicaBooks
        }
      ]
    },
    matematicas: {
      title: 'MATEMÁTICAS',
      books: [
        {
          id: 7,
          title: 'El Enigma de Fermat',
          author: 'Simon Singh',
          image: defaultBookCover
        },
        {
          id: 8,
          title: 'El Hombre que Calculaba',
          author: 'Malba Tahan',
          image: defaultBookCover
        },
        {
          id: 9,
          title: 'Matemáticas Discretas',
          author: 'Richard Johnsonbaugh',
          image: defaultBookCover
        }
      ]
    },
    literatura: {
      title: 'LITERATURA',
      books: [
        {
          id: 10,
          title: 'Cien Años de Soledad',
          author: 'Gabriel García Márquez',
          image: defaultBookCover
        },
        {
          id: 11,
          title: '1984',
          author: 'George Orwell',
          image: defaultBookCover
        },
        {
          id: 12,
          title: 'Don Quijote de la Mancha',
          author: 'Miguel de Cervantes',
          image: defaultBookCover
        }
      ]
    }
  };

  return (
    <div className="categories-container">
      {Object.values(categories).map((category) => (
        <div key={category.title} className="category-section">
          <h2>{category.title}</h2>
          {category.subcategories ? (
            // Renderizar subcategorías para CIENCIAS y TECNOLOGÍA
            category.subcategories.map((subcategory) => (
              <div key={subcategory.title} className="category-section">
                <h2>{subcategory.title}</h2>
                <div className="books-grid">
                  {subcategory.books.map((book) => (
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
                      </div>
                      <div className="book-info">
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            // Renderizar libros normalmente para otras categorías
            <div className="books-grid">
              {category.books.map((book) => (
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
                  </div>
                  <div className="book-info">
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryBooks; 