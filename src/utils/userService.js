// Función para obtener todos los usuarios registrados
export const getRegisteredUsers = () => {
  const users = localStorage.getItem('registeredUsers');
  return users ? JSON.parse(users) : [];
};

// Función para registrar un nuevo usuario
export const registerUser = (userData) => {
  const users = getRegisteredUsers();
  
  // Verificar si el correo ya está registrado
  if (users.some(user => user.email === userData.email)) {
    throw new Error('Este correo ya está registrado');
  }

  // Agregar el nuevo usuario
  const newUser = {
    ...userData,
    reservations: [],
    favorites: []
  };
  
  users.push(newUser);
  localStorage.setItem('registeredUsers', JSON.stringify(users));
  return newUser;
};

// Función para verificar las credenciales de inicio de sesión
export const loginUser = (email, password) => {
  const users = getRegisteredUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Correo o contraseña incorrectos');
  }
  
  return user;
};

// Función para actualizar los datos de un usuario (por ejemplo, sus reservas)
export const updateUser = (email, userData) => {
  const users = getRegisteredUsers();
  const userIndex = users.findIndex(u => u.email === email);
  
  if (userIndex === -1) {
    throw new Error('Usuario no encontrado');
  }
  
  users[userIndex] = { ...users[userIndex], ...userData };
  localStorage.setItem('registeredUsers', JSON.stringify(users));
  return users[userIndex];
};

// Función para limpiar todos los datos del localStorage
export const clearAllData = () => {
  localStorage.clear();
};

// Función para solo limpiar los datos de usuarios
export const clearUserData = () => {
  localStorage.removeItem('registeredUsers');
};

// Función para agregar/quitar un libro de favoritos
export const toggleFavorite = (email, bookId) => {
  const users = getRegisteredUsers();
  const userIndex = users.findIndex(u => u.email === email);
  
  if (userIndex === -1) {
    throw new Error('Usuario no encontrado');
  }

  const user = users[userIndex];
  const favorites = user.favorites || [];
  
  // Si el libro ya está en favoritos, lo quitamos
  if (favorites.includes(bookId)) {
    user.favorites = favorites.filter(id => id !== bookId);
  } else {
    // Si no está en favoritos, lo agregamos
    user.favorites = [...favorites, bookId];
  }
  
  users[userIndex] = user;
  localStorage.setItem('registeredUsers', JSON.stringify(users));
  return user;
}; 