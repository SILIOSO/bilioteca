import React from 'react';
import { useParams } from 'react-router-dom';
import CienciaBooks from './CienciaBooks';
import TecnologiaBooks from './TecnologiaBooks';
import MatematicasBooks from './MatematicasBooks';
import LiteraturaBooks from './LiteraturaBooks';
import './CategoryBooks.css';

const CategoryBooks = ({ isAuthenticated, userData, onFavoriteToggle }) => {
  const { categoria } = useParams();

  // Normalizar la categoría para la comparación
  const normalizedCategoria = categoria?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // Renderizar el componente correspondiente según la categoría
  const renderCategoryComponent = () => {
    switch (normalizedCategoria) {
      case 'ciencia':
        return <CienciaBooks 
          isAuthenticated={isAuthenticated} 
          userData={userData} 
          onFavoriteToggle={onFavoriteToggle}
        />;
      case 'tecnologia':
        return <TecnologiaBooks 
          isAuthenticated={isAuthenticated} 
          userData={userData} 
          onFavoriteToggle={onFavoriteToggle}
        />;
      case 'matematicas':
        return <MatematicasBooks 
          isAuthenticated={isAuthenticated} 
          userData={userData} 
          onFavoriteToggle={onFavoriteToggle}
        />;
      case 'literatura':
        return <LiteraturaBooks 
          isAuthenticated={isAuthenticated} 
          userData={userData} 
          onFavoriteToggle={onFavoriteToggle}
        />;
      default:
        return <div>Categoría no encontrada</div>;
    }
  };

  return renderCategoryComponent();
};

export default CategoryBooks; 