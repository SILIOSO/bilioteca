import { makeUserAdmin } from './userService';

// Hacer administrador al usuario específico
try {
  makeUserAdmin('cazador7676@gmail.com');
  console.log('Usuario cazador7676@gmail.com ahora es administrador');
} catch (error) {
  console.error('Error al hacer administrador:', error.message);
} 