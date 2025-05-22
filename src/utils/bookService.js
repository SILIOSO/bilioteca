// Importar todos los libros de las diferentes categorías
import { books as biologiaBooks } from '../components/SubcategoryBooks/Categories/BiologiaBooks';
import { books as quimicaBooks } from '../components/SubcategoryBooks/Categories/QuimicaBooks';
import { books as fisicaBooks } from '../components/SubcategoryBooks/Categories/FisicaBooks';
import { books as astronomiaBooks } from '../components/SubcategoryBooks/Categories/AstronomiaBooks';

// Combinar todos los libros en una sola colección
const allBooks = [
  ...biologiaBooks,
  ...quimicaBooks,
  ...fisicaBooks,
  ...astronomiaBooks
];

// Función para obtener un libro por su ID
export const getBookById = (id) => {
  const book = allBooks.find(book => book.id.toString() === id.toString());
  
  if (!book) {
    throw new Error('Libro no encontrado');
  }

  return {
    ...book,
    editorial: 'Editorial Universitaria', // Valor por defecto
    synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' // Valor por defecto
  };
}; 