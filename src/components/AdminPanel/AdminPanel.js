import React, { useState, useEffect } from 'react';
import { getRegisteredUsers } from '../../utils/userService';
import './AdminPanel.css';

const AdminPanel = ({ isAuthenticated, userData }) => {
  const [activeSection, setActiveSection] = useState('libros');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [libros, setLibros] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [libroEditando, setLibroEditando] = useState(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [previewImagen, setPreviewImagen] = useState(null);
  const [nuevoLibro, setNuevoLibro] = useState({
    titulo: '',
    autor: '',
    descripcion: '',
    isbn: '',
    disponible: true
  });

  useEffect(() => {
    if (activeSection === 'libros') {
      cargarLibros();
    } else if (activeSection === 'usuarios') {
      cargarUsuarios();
    } else if (activeSection === 'reservas') {
      cargarReservas();
    }
  }, [activeSection]);

  const cargarUsuarios = () => {
    const users = getRegisteredUsers();
    setUsuarios(users);
  };

  const cargarReservas = async () => {
    try {
      // Obtener todos los usuarios
      const users = getRegisteredUsers();
      
      // Extraer todas las reservas de todos los usuarios
      const todasLasReservas = users.reduce((acc, user) => {
        const reservasUsuario = (user.reservations || []).map(reserva => ({
          ...reserva,
          userName: user.name,
          userEmail: user.email
        }));
        return [...acc, ...reservasUsuario];
      }, []);

      setReservas(todasLasReservas);
    } catch (error) {
      console.error('Error al cargar reservas:', error);
    }
  };

  const cargarLibros = async () => {
    try {
      const response = await fetch('/api/books');
      if (response.ok) {
        const data = await response.json();
        setLibros(data);
      }
    } catch (error) {
      console.error('Error al cargar libros:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (libroEditando) {
      setLibroEditando({
        ...libroEditando,
        [name]: value
      });
    } else {
      setNuevoLibro({
        ...nuevoLibro,
        [name]: value
      });
    }
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImagenSeleccionada(file);
      
      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImagen(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const agregarLibro = async (e) => {
    e.preventDefault();
    
    try {
      const nuevoId = Date.now().toString();
      const nuevoLibroCompleto = {
        ...nuevoLibro,
        id: nuevoId,
        imagen: previewImagen,
        fechaAgregado: new Date().toISOString()
      };

      // Guardar en localStorage
      const librosActuales = JSON.parse(localStorage.getItem('libros') || '[]');
      const nuevosLibros = [...librosActuales, nuevoLibroCompleto];
      localStorage.setItem('libros', JSON.stringify(nuevosLibros));

      // Actualizar estado
      setLibros(nuevosLibros);
      
      // Limpiar formulario
      setNuevoLibro({
        titulo: '',
        autor: '',
        descripcion: '',
        isbn: '',
        disponible: true
      });
      setImagenSeleccionada(null);
      setPreviewImagen(null);
      setMostrarFormulario(false);
    } catch (error) {
      console.error('Error al agregar libro:', error);
      alert('Error al agregar el libro. Por favor, intenta de nuevo.');
    }
  };

  const editarLibro = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/books/${libroEditando.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(libroEditando),
      });

      if (response.ok) {
        setLibros(libros.map(libro => 
          libro.id === libroEditando.id ? libroEditando : libro
        ));
        setLibroEditando(null);
      }
    } catch (error) {
      console.error('Error al editar libro:', error);
    }
  };

  const eliminarLibro = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      try {
        const response = await fetch(`/api/books/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setLibros(libros.filter(libro => libro.id !== id));
        }
      } catch (error) {
        console.error('Error al eliminar libro:', error);
      }
    }
  };

  const aprobarReserva = async (reservaId, userEmail) => {
    try {
      const users = getRegisteredUsers();
      const userIndex = users.findIndex(u => u.email === userEmail);
      
      if (userIndex !== -1) {
        const user = users[userIndex];
        const reservaIndex = user.reservations.findIndex(r => r.id === reservaId);
        
        if (reservaIndex !== -1) {
          user.reservations[reservaIndex].status = 'APROBADA';
          localStorage.setItem('registeredUsers', JSON.stringify(users));
          cargarReservas(); // Recargar las reservas
        }
      }
    } catch (error) {
      console.error('Error al aprobar reserva:', error);
    }
  };

  const rechazarReserva = async (reservaId, userEmail) => {
    try {
      const users = getRegisteredUsers();
      const userIndex = users.findIndex(u => u.email === userEmail);
      
      if (userIndex !== -1) {
        const user = users[userIndex];
        const reservaIndex = user.reservations.findIndex(r => r.id === reservaId);
        
        if (reservaIndex !== -1) {
          user.reservations[reservaIndex].status = 'RECHAZADA';
          localStorage.setItem('registeredUsers', JSON.stringify(users));
          cargarReservas(); // Recargar las reservas
        }
      }
    } catch (error) {
      console.error('Error al rechazar reserva:', error);
    }
  };

  // Función modificada para bloquear/desbloquear usuarios y cambiar contraseña
  const toggleBloquearUsuario = (userEmail) => {
    try {
      const users = getRegisteredUsers();
      const userIndex = users.findIndex(u => u.email === userEmail);
      
      if (userIndex !== -1) {
        const user = users[userIndex];
        const accion = user.isBlocked ? 'desbloquear' : 'bloquear';
        
        if (window.confirm(`¿Estás seguro de que deseas ${accion} a ${user.name}?`)) {
          // Toggle el estado de bloqueo
          user.isBlocked = !user.isBlocked;
          user.blockedDate = user.isBlocked ? new Date().toISOString() : null;
          
          // Si se está bloqueando al usuario, cambiar la contraseña a "000"
          if (user.isBlocked) {
            user.originalPassword = user.password; // Guardar la contraseña original
            user.password = '000';
            alert(`Usuario ${user.name} bloqueado exitosamente. Su contraseña se ha cambiado a "000".`);
          } else {
            // Si se está desbloqueando, restaurar la contraseña original (opcional)
            if (user.originalPassword) {
              user.password = user.originalPassword;
              delete user.originalPassword; // Eliminar la contraseña temporal guardada
            }
            alert(`Usuario ${user.name} desbloqueado exitosamente. Su contraseña original ha sido restaurada.`);
          }
          
          // Guardar en localStorage
          localStorage.setItem('registeredUsers', JSON.stringify(users));
          
          // Actualizar estado local
          cargarUsuarios();
        }
      }
    } catch (error) {
      console.error('Error al cambiar estado del usuario:', error);
      alert('Error al cambiar el estado del usuario. Por favor, intenta de nuevo.');
    }
  };

  const renderFormularioLibro = () => (
    <div className="libro-formulario">
      <h3>Agregar Nuevo Libro</h3>
      <form onSubmit={agregarLibro}>
        <div className="form-group">
          <h3>Título:</h3>
          <input
            type="text"
            name="titulo"
            value={nuevoLibro.titulo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <h3>Autor:</h3>
          <input
            type="text"
            name="autor"
            value={nuevoLibro.autor}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <h3>Editorial:</h3>
          <input
            type="text"
            name="autor"
            value={nuevoLibro.autor}
            onChange={handleInputChange}
            required
          />
          <div className="form-group">
          <h3>Genero:</h3>
          <input
            type="text"
            name="autor"
            value={nuevoLibro.autor}
            onChange={handleInputChange}
            required
          />
        </div>
        </div>
        <div className="form-group">
          <h3>Descripción:</h3>
          <textarea
            name="descripcion"
            value={nuevoLibro.descripcion}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <h3>Imagen del libro:</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagenChange}
            required
          />
          {previewImagen && (
            <div className="imagen-preview">
              <img src={previewImagen} alt="Preview" />
            </div>
          )}
        </div>
        <div className="form-group">
          <h3>ISBN:</h3>
          <input
            type="text"
            name="isbn"
            value={nuevoLibro.isbn}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Agregar Libro
          </button>
          <button 
            type="button" 
            className="btn-cancel"
            onClick={() => {
              setMostrarFormulario(false);
              setImagenSeleccionada(null);
              setPreviewImagen(null);
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );

  const renderReservas = () => (
    <div className="admin-section">
      <h2>Todas las Reservas</h2>
      <div className="reservas-list">
        {reservas.length === 0 ? (
          <p className="empty-state">No hay reservas pendientes</p>
        ) : (
          reservas.map(reserva => (
            <div key={reserva.id} className="reservation-item">
              <div className="reservation-info">
                <img 
                  src={reserva.book.coverImage || '/placeholder-book.png'} 
                  alt={reserva.book.title}
                  className="book-thumbnail"
                />
                <div className="details">
                  <h3>{reserva.book.title}</h3>
                  <p>Usuario: {reserva.userName}</p>
                  <p>Email: {reserva.userEmail}</p>
                  <p>Fecha de reserva: {new Date(reserva.reservationDate).toLocaleDateString()}</p>
                  <p>Estado: <span className={`status-badge ${reserva.status.toLowerCase()}`}>{reserva.status}</span></p>
                </div>
              </div>
              <div className="reservation-actions">
                {reserva.status === 'PENDIENTE' && (
                  <>
                    <button 
                      className="approve-button"
                      onClick={() => aprobarReserva(reserva.id, reserva.userEmail)}
                    >
                      Aprobar
                    </button>
                    <button 
                      className="reject-button"
                      onClick={() => rechazarReserva(reserva.id, reserva.userEmail)}
                    >
                      Rechazar
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderLibros = () => {
    // Ordenar libros por fecha de agregado (más recientes primero)
    const librosOrdenados = [...libros].sort((a, b) => 
      new Date(b.fechaAgregado) - new Date(a.fechaAgregado)
    );

    return (
      <div className="admin-section">
        <h2>Gestión de Libros</h2>
        {!mostrarFormulario && (
          <button 
            className="btn-agregar"
            onClick={() => setMostrarFormulario(true)}
          >
            Agregar Nuevo Libro
          </button>
        )}

        {mostrarFormulario && renderFormularioLibro()}

        <h3 className="seccion-titulo">RECIÉN AGREGADOS</h3>
        <div className="libros-grid">
          {librosOrdenados.map(libro => (
            <div key={libro.id} className="libro-card">
              <img 
                src={libro.imagen || '/placeholder-book.png'} 
                alt={libro.titulo}
                className="libro-imagen"
              />
              <div className="libro-info">
                <h3>{libro.titulo}</h3>
                <p className="autor">{libro.autor}</p>
                <p className="descripcion">{libro.descripcion}</p>
                <p className="isbn">ISBN: {libro.isbn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderUsuarios = () => (
    <div className="admin-section">
      <h2>Gestión de Usuarios</h2>
      <div className="usuarios-list">
        {usuarios.length === 0 ? (
          <p className="empty-state">No hay usuarios registrados</p>
        ) : (
          usuarios.map(usuario => (
            <div key={usuario.email} className="usuario-card">
              <div className="usuario-info">
                <h3>{usuario.name}</h3>
                <p>Email: {usuario.email}</p>
                <p>Rol: {usuario.isAdmin ? 'Administrador' : 'Usuario'}</p>
                <p>Reservas activas: {(usuario.reservations || []).length}</p>
                <p>Libros favoritos: {(usuario.favorites || []).length}</p>
                <p>Estado: <span className={`status-badge ${usuario.isBlocked ? 'bloqueado' : 'activo'}`}>
                  {usuario.isBlocked ? 'BLOQUEADO' : 'ACTIVO'}
                </span></p>
                {usuario.isBlocked && usuario.blockedDate && (
                  <p className="blocked-date">
                    Bloqueado el: {new Date(usuario.blockedDate).toLocaleDateString()}
                  </p>
                )}
                {usuario.isBlocked && (
                  <p className="password-info">
                    <strong>Contraseña temporal: 000</strong>
                  </p>
                )}
              </div>
              <div className="usuario-actions">
                {!usuario.isAdmin && (
                  <button 
                    className={usuario.isBlocked ? 'btn-unblock' : 'btn-block'}
                    onClick={() => toggleBloquearUsuario(usuario.email)}
                  >
                    {usuario.isBlocked ? 'Desbloquear' : 'Bloquear'}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  if (!isAuthenticated || !userData?.isAdmin) {
    return (
      <div className="admin-panel">
        <h1>Acceso Denegado</h1>
        <p>No tienes permisos para acceder al panel de administración.</p>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>
      
      <div className="admin-navigation">
        <button 
          className={`nav-button ${activeSection === 'reservas' ? 'active' : ''}`}
          onClick={() => setActiveSection('reservas')}
        >
          Reservas
        </button>
        <button 
          className={`nav-button ${activeSection === 'libros' ? 'active' : ''}`}
          onClick={() => setActiveSection('libros')}
        >
          Libros
        </button>
        <button 
          className={`nav-button ${activeSection === 'usuarios' ? 'active' : ''}`}
          onClick={() => setActiveSection('usuarios')}
        >
          Usuarios
        </button>
      </div>

      <div className="admin-content">
        {activeSection === 'reservas' && renderReservas()}
        {activeSection === 'libros' && renderLibros()}
        {activeSection === 'usuarios' && renderUsuarios()}
      </div>
    </div>
  );
};

export default AdminPanel;