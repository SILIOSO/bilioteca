import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleBookClick = (bookId) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate(`/libro/${bookId}`);
    }
  };

  const recentBooks = [
    {
      id: 1,
      title: 'Los Juicios de Salem',
      image: '/images/juicios-salem.jpg',
      category: 'Terror'
    },
    {
      id: 2,
      title: 'Nuestra Señora de París',
      image: '/images/notre-dame.jpg',
      category: 'Clásicos'
    },
    {
      id: 3,
      title: 'Alicia en el País de las Maravillas',
      image: '/images/alicia.jpg',
      category: 'Fantasía'
    },
    // Agrega más libros aquí
  ];

  return (
    <div className="home">
      <div className="banner">
        <h1>RECIÉN AGREGADOS</h1>
      </div>
      
      <div className="books-grid">
        {recentBooks.map((book) => (
          <div 
            key={book.id} 
            className="book-card"
            onClick={() => handleBookClick(book.id)}
          >
            <div className="book-image">
              <img src={book.image} alt={book.title} />
            </div>
            <div className="book-info">
              <h3>{book.title}</h3>
              <p>{book.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home; 