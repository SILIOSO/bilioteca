
import React from 'react';

const BookDetail = ({ book, onReserve }) => {
  return (
    <div className="book-detail">
      <div className="book-detail-container">
        <div className="book-cover">
          <img src={book.coverImage} alt={book.title} className="book-image" />
        </div>
        <div className="book-info">
          <h2 className="book-title">{book.title}</h2>
          <div className="book-metadata">
            <p className="author"><strong>Autor:</strong> {book.author}</p>
            <p className="editorial"><strong>Editorial:</strong> {book.editorial}</p>
            <p className="category"><strong>Categoría:</strong> {book.category}</p>
            <div className="synopsis">
              <p className="synopsis-label"><strong>Sinopsis:</strong></p>
              <p className="synopsis-text">"{book.synopsis}"</p>
            </div>
          </div>
          <button className="reserve-button" onClick={onReserve}>
            RESERVAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;