// Función para obtener todas las reservas pendientes
export const getPendingReservations = () => {
  try {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    console.log('Obteniendo usuarios para reservas:', users);
    
    const allReservations = [];

    users.forEach(user => {
      console.log('Procesando usuario:', user.email);
      const userReservations = user.reservations || [];
      console.log('Reservas del usuario:', userReservations);
      
      userReservations.forEach(reservation => {
        console.log('Procesando reserva:', reservation);
        // Incluir todas las reservas sin importar su estado
        allReservations.push({
          ...reservation,
          userName: user.name,
          userEmail: user.email
        });
      });
    });

    console.log('Todas las reservas encontradas:', allReservations);
    return allReservations;
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    return [];
  }
};

// Función para aprobar una reserva
export const approveReservation = (userEmail, reservationId) => {
  const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  const userIndex = users.findIndex(u => u.email === userEmail);

  if (userIndex === -1) {
    throw new Error('Usuario no encontrado');
  }

  const user = users[userIndex];
  const reservationIndex = user.reservations.findIndex(r => r.id === reservationId);

  if (reservationIndex === -1) {
    throw new Error('Reserva no encontrada');
  }

  // Actualizar el estado de la reserva a ACTIVA
  user.reservations[reservationIndex] = {
    ...user.reservations[reservationIndex],
    status: 'ACTIVA',
    approvalDate: new Date().toISOString(),
    returnDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 días
  };

  // Actualizar el usuario en localStorage
  users[userIndex] = user;
  localStorage.setItem('registeredUsers', JSON.stringify(users));

  return user.reservations[reservationIndex];
};

// Función para rechazar una reserva
export const rejectReservation = (userEmail, reservationId) => {
  const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  const userIndex = users.findIndex(u => u.email === userEmail);

  if (userIndex === -1) {
    throw new Error('Usuario no encontrado');
  }

  const user = users[userIndex];
  
  // Filtrar la reserva rechazada
  user.reservations = user.reservations.filter(r => r.id !== reservationId);

  // Actualizar el usuario en localStorage
  users[userIndex] = user;
  localStorage.setItem('registeredUsers', JSON.stringify(users));

  return true;
}; 