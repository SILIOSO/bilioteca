import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import BiologiaBooks from './Categories/BiologiaBooks';
import QuimicaBooks from './Categories/QuimicaBooks';
import FisicaBooks from './Categories/FisicaBooks';
import AstronomiaBooks from './Categories/AstronomiaBooks';
import './SubcategoryBooks.css';

const SubcategoryBooks = ({ isAuthenticated, userData }) => {
  const { categoria, subcategoria } = useParams();

  // Función para normalizar texto (quitar acentos y convertir a minúsculas)
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const renderSubcategory = () => {
    // Normalizar la categoría y subcategoría recibidas
    const normalizedCategoria = normalizeText(categoria);
    const normalizedSubcategoria = normalizeText(subcategoria);

    // Verificar que estamos en la categoría correcta
    if (normalizedCategoria !== 'ciencia') {
      return <Navigate to="/" replace />;
    }

    // Mapeo de subcategorías normalizadas a componentes
    const subcategoryComponents = {
      'biologia': <BiologiaBooks isAuthenticated={isAuthenticated} userData={userData} />,
      'quimica': <QuimicaBooks isAuthenticated={isAuthenticated} userData={userData} />,
      'fisica': <FisicaBooks isAuthenticated={isAuthenticated} userData={userData} />,
      'astronomia': <AstronomiaBooks isAuthenticated={isAuthenticated} userData={userData} />
    };

    // Retornar el componente correspondiente o redireccionar si no existe
    return subcategoryComponents[normalizedSubcategoria] || <Navigate to="/" replace />;
  };

  return renderSubcategory();
};

export default SubcategoryBooks; 