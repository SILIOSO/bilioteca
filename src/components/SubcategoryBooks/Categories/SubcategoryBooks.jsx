import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import BiologiaBooks from './Categories/BiologiaBooks';
import QuimicaBooks from './Categories/QuimicaBooks';
import FisicaBooks from './Categories/FisicaBooks';
import AstronomiaBooks from './Categories/AstronomiaBooks';
import InformaticaBooks from './Categories/InformaticaBooks';
import RoboticaBooks from './Categories/RoboticaBooks';
import ElectronicaBooks from './Categories/ElectronicaBooks';
import AlgebraBooks from './Categories/AlgebraBooks';
import GeometriaBooks from './Categories/GeometriaBooks';
import CalculoBooks from './Categories/CalculoBooks';
import TerrorBooks from './Categories/TerrorBooks';
import RomanceBooks from './Categories/RomanceBooks';
import FantasiaBooks from './Categories/FantasiaBooks';
import './SubcategoryBooks.css';

const SubcategoryBooks = ({ isAuthenticated, userData, onFavoriteToggle }) => {
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
    if (normalizedCategoria !== 'ciencia' && 
        normalizedCategoria !== 'tecnologia' && 
        normalizedCategoria !== 'matematicas' && 
        normalizedCategoria !== 'literatura') {
      return <Navigate to="/" replace />;
    }

    // Mapeo de subcategorías normalizadas a componentes
    const subcategoryComponents = {
      // Subcategorías de Ciencia
      'biologia': <BiologiaBooks isAuthenticated={isAuthenticated} userData={userData} onFavoriteToggle={onFavoriteToggle} />,
      'quimica': <QuimicaBooks isAuthenticated={isAuthenticated} userData={userData} onFavoriteToggle={onFavoriteToggle} />,
      'fisica': <FisicaBooks isAuthenticated={isAuthenticated} userData={userData} onFavoriteToggle={onFavoriteToggle} />,
      'astronomia': <AstronomiaBooks isAuthenticated={isAuthenticated} userData={userData} onFavoriteToggle={onFavoriteToggle} />,
      
      // Subcategorías de Tecnología
      'informatica': <InformaticaBooks isAuthenticated={isAuthenticated} userData={userData} onFavoriteToggle={onFavoriteToggle} />,
      'robotica': <RoboticaBooks isAuthenticated={isAuthenticated} userData={userData} onFavoriteToggle={onFavoriteToggle} />,
      'electronica': <ElectronicaBooks isAuthenticated={isAuthenticated} userData={userData} onFavoriteToggle={onFavoriteToggle} />,

      // Subcategorías de Matemáticas
      'algebra': <AlgebraBooks isAuthenticated={isAuthenticated} userData={userData} onFavoriteToggle={onFavoriteToggle} />,
      'geometria': <GeometriaBooks isAuthenticated={isAuthenticated} userData={userData} onFavoriteToggle={onFavoriteToggle} />,
      'calculo': <CalculoBooks isAuthenticated={isAuthenticated} userData={userData} onFavoriteToggle={onFavoriteToggle} />,

      // Subcategorías de Literatura
      'terror': <TerrorBooks isAuthenticated={isAuthenticated} userData={userData} onFavoriteToggle={onFavoriteToggle} />,
      'romance': <RomanceBooks isAuthenticated={isAuthenticated} userData={userData} onFavoriteToggle={onFavoriteToggle} />,
      'fantasia': <FantasiaBooks isAuthenticated={isAuthenticated} userData={userData} onFavoriteToggle={onFavoriteToggle} />
    };

    // Retornar el componente correspondiente o redireccionar si no existe
    return subcategoryComponents[normalizedSubcategoria] || <Navigate to="/" replace />;
  };

  return renderSubcategory();
};

export default SubcategoryBooks; 