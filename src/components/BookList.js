import React from 'react';
import { Link } from 'react-router-dom';

const BookList = ({ books }) => {
  return (
    <div className="book-list">
      {books.map(book => (
        <Link to={`/book/${book.id}`} className="book-item" key={book.id}>
          <div className="book-cover">
            <img 
              src={book.coverImage} 
              alt={book.title} 
              className="book-image" 
            />
          </div>
          <div className="book-info">
            <h3 className="book-title">{book.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BookList;