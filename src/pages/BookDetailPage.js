import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookDetail from '../components/BookDetail';

const BookDetailPage = () => {
  const navigate = useNavigate();
  
  // Datos de ejemplo para un libro
  const bookData = {
    id: 1,
    title: "Cuentos Macabros",
    author: "Carlos Sanchez",
    editorial: "Acantilado",
    category: "Terror",
    synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    coverImage: "/placeholder.png"
  };

  const handleReserve = () => {
    // Lógica para reservar el libro
    alert("Libro reservado con éxito");
    navigate('/reservas');
  };

  return (
    <div className="page book-detail-page">
      <Header />
      <main className="main-content">
        <BookDetail book={bookData} onReserve={handleReserve} />
      </main>
      <Footer />
    </div>
  );
};

export default BookDetailPage;