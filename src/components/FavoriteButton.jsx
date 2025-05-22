import React, { useState } from 'react';
import { toggleFavorite } from '../utils/userService';
import './FavoriteButton.css';

const FavoriteButton = ({ bookId, isFavorite, userEmail, onToggle }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentFavorite, setCurrentFavorite] = useState(isFavorite);

  const handleClick = async (e) => {
    e.stopPropagation(); // Evitar que el click se propague a la tarjeta del libro
    
    if (isLoading) return; // Evitar múltiples clicks mientras se procesa

    try {
      setIsLoading(true);
      const updatedUser = toggleFavorite(userEmail, bookId);
      setCurrentFavorite(!currentFavorite);
      onToggle && onToggle(updatedUser);
    } catch (error) {
      console.error('Error al actualizar favoritos:', error);
      // Revertir el estado en caso de error
      setCurrentFavorite(currentFavorite);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`favorite-button ${isLoading ? 'loading' : ''}`}
      aria-label={currentFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      disabled={isLoading}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={currentFavorite ? "#ff0000" : "none"}
        stroke={currentFavorite ? "#ff0000" : "#ffffff"}
        strokeWidth="2"
        className="heart-icon"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
  );
};

export default FavoriteButton; 