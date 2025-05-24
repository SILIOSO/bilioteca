// Importar todos los libros de las diferentes categorías
import { books as biologiaBooks } from '../components/SubcategoryBooks/Categories/BiologiaBooks';
import { books as quimicaBooks } from '../components/SubcategoryBooks/Categories/QuimicaBooks';
import { books as fisicaBooks } from '../components/SubcategoryBooks/Categories/FisicaBooks';
import { books as astronomiaBooks } from '../components/SubcategoryBooks/Categories/AstronomiaBooks';

// Combinar todos los libros en una sola colección
let allBooks = [
  ...biologiaBooks,
  ...quimicaBooks,
  ...fisicaBooks,
  ...astronomiaBooks
];

// Función para obtener todos los libros
export const getAllBooks = () => {
  const booksFromStorage = localStorage.getItem('books');
  if (booksFromStorage) {
    allBooks = JSON.parse(booksFromStorage);
  }
  return allBooks;
};

// Función para obtener un libro por su ID
export const getBookById = (id) => {
  const books = getAllBooks();
  const book = books.find(book => book.id.toString() === id.toString());
  
  if (!book) {
    throw new Error('Libro no encontrado');
  }

  return {
    ...book,
    editorial: book.editorial || 'Editorial Universitaria',
    synopsis: book.synopsis || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  };
};

// Función para agregar un nuevo libro
export const addBook = (bookData) => {
  const books = getAllBooks();
  const newId = Math.max(...books.map(b => b.id)) + 1;
  
  const newBook = {
    id: newId,
    ...bookData,
    image: bookData.image || '/images/default-book.jpg'
  };
  
  allBooks = [...books, newBook];
  localStorage.setItem('books', JSON.stringify(allBooks));
  return newBook;
};

// Función para editar un libro existente
export const editBook = (id, bookData) => {
  const books = getAllBooks();
  const index = books.findIndex(book => book.id.toString() === id.toString());
  
  if (index === -1) {
    throw new Error('Libro no encontrado');
  }
  
  const updatedBook = {
    ...books[index],
    ...bookData,
    id: books[index].id // Mantener el ID original
  };
  
  allBooks = [
    ...books.slice(0, index),
    updatedBook,
    ...books.slice(index + 1)
  ];
  
  localStorage.setItem('books', JSON.stringify(allBooks));
  return updatedBook;
};

// Función para eliminar un libro
export const deleteBook = (id) => {
  const books = getAllBooks();
  const filteredBooks = books.filter(book => book.id.toString() !== id.toString());
  
  if (filteredBooks.length === books.length) {
    throw new Error('Libro no encontrado');
  }
  
  allBooks = filteredBooks;
  localStorage.setItem('books', JSON.stringify(allBooks));
  return true;
}; 