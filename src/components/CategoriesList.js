import React from 'react';
import { Link } from 'react-router-dom';

const CategoriesList = ({ categories }) => {
  return (
    <div className="categories-list">
      {categories.map(category => (
        <Link 
          to={`/categoria/${category.id}`} 
          className="category-item" 
          key={category.id}
        >
          <div className="category-image-container">
            <img 
              src={category.coverImage} 
              alt={category.name} 
              className="category-image" 
            />
          </div>
          <div className="category-name">{category.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesList;