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

  // Determinar si el usuario debe ser administrador
  const isAdmin = userData.email === 'cazador7676@gmail.com' || users.length === 0;

  // Agregar el nuevo usuario
  const newUser = {
    ...userData,
    reservations: [],
    favorites: [],
    isAdmin: isAdmin // El usuario será administrador si es cazador7676@gmail.com o es el primer usuario
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

  // Asegurarse de que cazador7676@gmail.com siempre sea administrador
  if (email === 'cazador7676@gmail.com' && !user.isAdmin) {
    user.isAdmin = true;
    updateUser(email, user);
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
  
  // Asegurarse de que cazador7676@gmail.com mantenga sus privilegios de administrador
  if (email === 'cazador7676@gmail.com') {
    userData.isAdmin = true;
  }
  
  users[userIndex] = { ...users[userIndex], ...userData };
  localStorage.setItem('registeredUsers', JSON.stringify(users));
  return users[userIndex];
};

// Función para hacer administrador a un usuario
export const makeUserAdmin = (email) => {
  const users = getRegisteredUsers();
  const userIndex = users.findIndex(u => u.email === email);
  
  if (userIndex === -1) {
    throw new Error('Usuario no encontrado');
  }
  
  users[userIndex] = { ...users[userIndex], isAdmin: true };
  localStorage.setItem('registeredUsers', JSON.stringify(users));
  return users[userIndex];
};

// Función para verificar si un usuario es administrador
export const isUserAdmin = (email) => {
  // cazador7676@gmail.com siempre es administrador
  if (email === 'cazador7676@gmail.com') return true;
  
  const users = getRegisteredUsers();
  const user = users.find(u => u.email === email);
  return user?.isAdmin || false;
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