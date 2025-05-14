import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoriesList from '../components/CategoriesList';

const CategoriesPage = () => {
  // Datos de ejemplo para las categorías
  const categories = [
    {
      id: 1,
      name: "Terror",
      coverImage: "/placeholder.png"
    },
    {
      id: 2,
      name: "Romance",
      coverImage: "/placeholder.png"
    },
    {
      id: 3,
      name: "Ciencia",
      coverImage: "/placeholder.png"
    },
    {
      id: 4,
      name: "Física",
      coverImage: "/placeholder.png"
    },
    {
      id: 5,
      name: "Biología",
      coverImage: "/placeholder.png"
    },
    {
      id: 6,
      name: "Matemáticas",
      coverImage: "/placeholder.png"
    },
    {
      id: 7,
      name: "Química",
      coverImage: "/placeholder.png"
    },
    {
      id: 8,
      name: "Fantasía",
      coverImage: "/placeholder.png"
    }
  ];

  return (
    <div className="page categories-page">
      <Header />
      <main className="main-content">
        <div className="banner-container">
          <h1 className="page-title">Categorías</h1>
        </div>
        <CategoriesList categories={categories} />
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;