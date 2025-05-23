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
      image: '/images/los juicios de salem.jpg',
      category: 'Terror'
    },
    {
      id: 2,
      title: 'Nuestra Señora de París',
      image: '/images/nuestra señora de paris.jpg',
      category: 'Clásicos'
    },
    {
      id: 3,
      title: 'Alicia en el País de las Maravillas',
      image: '/images/alicia .png',
      category: 'Fantasía'
    },
    {
      id: 4,
      title: 'Los Hombres del Norte',
      image: '/images/los hombres del norte.jpg',
      category: 'Fantasía'
    },
    {
      id: 5,
      title: 'Las Vidas Dentro de tu Cabeza',
      image: '/images/las vidas .png',
      category: 'Fantasía'
    },
    {
      id: 6,
      title: 'Cuentos Macabros',
      image: '/images/cuentos macabros.jpg',
      category: 'Terror'
    },
    {
      id: 7,
      title: 'Atlantis',
      image: '/images/atlantis.jpg',
      category: 'Fantasía'
    },
    {
      id: 8,
      title: 'Cada Historia Cuenta',
      image: '/images/cada historia cuenta.jpg',
      category: 'Romance'
    },
    {
      id: 9,
      title: 'The Bell Jar',
      image: '/images/the bell jar.webp',
      category: 'Fantasía'
    },
    {
      id: 10,
      title: 'A Teaspoon Earth',
      image: '/images/a teaspoon.jpg',
      category: 'Fantasía'
    },
    {
      id: 11,
      title: 'Quimica',
      image: '/images/quimica.png',
      category: 'Ciencia'
    },
    {
      id: 12,
      title: 'Fisica',
      image: '/images/fisica.png',
      category: 'Ciencia'
    },
    // Agrega más libros aquí
  ];

  return (
    <div className="home">
      <div className="banner">
        <img src="/images/recien-agregados.jpg" alt="Recién agregados banner" />
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