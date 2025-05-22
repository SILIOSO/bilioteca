import React from 'react';
import { useNavigate } from 'react-router-dom';
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
      books: [
        {
          id: 1,
          title: 'El Origen de las Especies',
          author: 'Charles Darwin',
          image: defaultBookCover
        },
        {
          id: 2,
          title: 'Cosmos',
          author: 'Carl Sagan',
          image: defaultBookCover
        },
        {
          id: 3,
          title: 'El Gen Egoísta',
          author: 'Richard Dawkins',
          image: defaultBookCover
        }
      ]
    },
    tecnologia: {
      title: 'TECNOLOGÍA',
      books: [
        {
          id: 4,
          title: 'Inteligencia Artificial',
          author: 'Stuart Russell',
          image: defaultBookCover
        },
        {
          id: 5,
          title: 'Clean Code',
          author: 'Robert C. Martin',
          image: defaultBookCover
        },
        {
          id: 6,
          title: 'El Futuro de la Humanidad',
          author: 'Michio Kaku',
          image: defaultBookCover
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
        </div>
      ))}
    </div>
  );
};

export default CategoryBooks; 