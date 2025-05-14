import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookList from '../components/BookList';

const HomePage = () => {
  // Datos de ejemplo para la lista de libros recomendados
  const recentBooks = [
    {
      id: 1,
      title: "Los Hombres del Norte",
      author: "John Haywood",
      coverImage: "/placeholder.png"
    },
    {
      id: 2,
      title: "Los Juicios de Salem",
      author: "Stacy Schiff",
      coverImage: "/placeholder.png"
    },
    {
      id: 3,
      title: "Nuestra Señora de París",
      author: "Victor Hugo",
      coverImage: "/placeholder.png"
    },
    {
      id: 4,
      title: "Alicia en el País de las Maravillas",
      author: "Lewis Carroll",
      coverImage: "/placeholder.png"
    },
    {
      id: 5,
      title: "Las Vidas Dentro de tu Cabeza",
      author: "Lisa Cron",
      coverImage: "/placeholder.png"
    },
    {
      id: 6,
      title: "Cuentos Macabros",
      author: "Edgar Allan Poe",
      coverImage: "/placeholder.png"
    },
    {
      id: 7,
      title: "Atlantis",
      author: "David Gibbins",
      coverImage: "/placeholder.png"
    },
    {
      id: 8,
      title: "Cada Historia Cuenta",
      author: "Varios Autores",
      coverImage: "/placeholder.png"
    },
    {
      id: 9,
      title: "The Bell Jar",
      author: "Sylvia Plath",
      coverImage: "/placeholder.png"
    },
    {
      id: 10,
      title: "A Teaspoon of Earth and Sea",
      author: "Dina Nayeri",
      coverImage: "/placeholder.png"
    }
  ];

  return (
    <div className="page home-page">
      <Header />
      <main className="main-content">
        <div className="banner-container">
          <h1 className="page-title">Recién Agregados</h1>
        </div>
        <BookList books={recentBooks} />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;