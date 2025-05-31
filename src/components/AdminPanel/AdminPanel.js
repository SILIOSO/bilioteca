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
  const [reporteSeleccionado, setReporteSeleccionado] = useState('');
  const [nuevoLibro, setNuevoLibro] = useState({
    titulo: '',
    autor: '',
    editorial: '',
    genero: '',
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
      const users = getRegisteredUsers();
      
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
      const librosGuardados = JSON.parse(localStorage.getItem('libros') || '[]');
      setLibros(librosGuardados);
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

      const librosActuales = JSON.parse(localStorage.getItem('libros') || '[]');
      const nuevosLibros = [...librosActuales, nuevoLibroCompleto];
      localStorage.setItem('libros', JSON.stringify(nuevosLibros));

      setLibros(nuevosLibros);
      
      setNuevoLibro({
        titulo: '',
        autor: '',
        editorial: '',
        genero: '',
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

  // Función para iniciar la edición de un libro
  const iniciarEdicion = (libro) => {
    setLibroEditando({ ...libro });
    setPreviewImagen(libro.imagen);
    setMostrarFormulario(false); // Cerrar formulario de agregar si está abierto
  };

  // Función para cancelar la edición
  const cancelarEdicion = () => {
    setLibroEditando(null);
    setPreviewImagen(null);
    setImagenSeleccionada(null);
  };

  // Función modificada para editar libro usando localStorage
  const editarLibro = async (e) => {
    e.preventDefault();
    try {
      // Obtener libros actuales del localStorage
      const librosActuales = JSON.parse(localStorage.getItem('libros') || '[]');
      
      // Crear el libro actualizado
      const libroActualizado = {
        ...libroEditando,
        imagen: previewImagen || libroEditando.imagen, // Usar nueva imagen o mantener la actual
        fechaModificado: new Date().toISOString()
      };
      
      // Actualizar el libro en la lista
      const librosActualizados = librosActuales.map(libro => 
        libro.id === libroEditando.id ? libroActualizado : libro
      );
      
      // Guardar en localStorage
      localStorage.setItem('libros', JSON.stringify(librosActualizados));
      
      // Actualizar el estado
      setLibros(librosActualizados);
      
      // Limpiar estado de edición
      setLibroEditando(null);
      setPreviewImagen(null);
      setImagenSeleccionada(null);
      
      alert('Libro actualizado exitosamente');
    } catch (error) {
      console.error('Error al editar libro:', error);
      alert('Error al actualizar el libro. Por favor, intenta de nuevo.');
    }
  };

  const eliminarLibro = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      try {
        const librosActuales = JSON.parse(localStorage.getItem('libros') || '[]');
        const librosActualizados = librosActuales.filter(libro => libro.id !== id);
        localStorage.setItem('libros', JSON.stringify(librosActualizados));
        setLibros(librosActualizados);
        alert('Libro eliminado exitosamente');
      } catch (error) {
        console.error('Error al eliminar libro:', error);
        alert('Error al eliminar el libro. Por favor, intenta de nuevo.');
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
          cargarReservas();
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
          cargarReservas();
        }
      }
    } catch (error) {
      console.error('Error al rechazar reserva:', error);
    }
  };

  const toggleBloquearUsuario = (userEmail) => {
    try {
      const users = getRegisteredUsers();
      const userIndex = users.findIndex(u => u.email === userEmail);
      
      if (userIndex !== -1) {
        const user = users[userIndex];
        const accion = user.isBlocked ? 'desbloquear' : 'bloquear';
        
        if (window.confirm(`¿Estás seguro de que deseas ${accion} a ${user.name}?`)) {
          user.isBlocked = !user.isBlocked;
          user.blockedDate = user.isBlocked ? new Date().toISOString() : null;
          
          if (user.isBlocked) {
            user.originalPassword = user.password;
            user.password = '000';
            alert(`Usuario ${user.name} bloqueado exitosamente. Su contraseña se ha cambiado a "000".`);
          } else {
            if (user.originalPassword) {
              user.password = user.originalPassword;
              delete user.originalPassword;
            }
            alert(`Usuario ${user.name} desbloqueado exitosamente. Su contraseña original ha sido restaurada.`);
          }
          
          localStorage.setItem('registeredUsers', JSON.stringify(users));
          cargarUsuarios();
        }
      }
    } catch (error) {
      console.error('Error al cambiar estado del usuario:', error);
      alert('Error al cambiar el estado del usuario. Por favor, intenta de nuevo.');
    }
  };

  // Funciones para generar reportes
  const generarReporteLibrosPrestados = () => {
    const reservasAprobadas = reservas.filter(reserva => reserva.status === 'APROBADA');
    
    const reporte = {
      titulo: 'Reporte de Libros Prestados',
      fecha: new Date().toLocaleDateString(),
      total: reservasAprobadas.length,
      datos: reservasAprobadas.map(reserva => ({
        libro: reserva.book.title,
        autor: reserva.book.author,
        usuario: reserva.userName,
        email: reserva.userEmail,
        fechaPrestamo: new Date(reserva.reservationDate).toLocaleDateString()
      }))
    };

    return reporte;
  };

  const generarReporteUsuariosBloqueados = () => {
    const usuariosBloqueados = usuarios.filter(usuario => usuario.isBlocked);
    
    const reporte = {
      titulo: 'Reporte de Usuarios Bloqueados',
      fecha: new Date().toLocaleDateString(),
      total: usuariosBloqueados.length,
      datos: usuariosBloqueados.map(usuario => ({
        nombre: usuario.name,
        email: usuario.email,
        fechaBloqueo: usuario.blockedDate ? new Date(usuario.blockedDate).toLocaleDateString() : 'N/A',
        reservasActivas: (usuario.reservations || []).length
      }))
    };

    return reporte;
  };

  const generarReporteReservas = () => {
    const reservasPendientes = reservas.filter(reserva => reserva.status === 'PENDIENTE');
    const reservasAprobadas = reservas.filter(reserva => reserva.status === 'APROBADA');
    const reservasRechazadas = reservas.filter(reserva => reserva.status === 'RECHAZADA');
    
    const reporte = {
      titulo: 'Reporte General de Reservas',
      fecha: new Date().toLocaleDateString(),
      resumen: {
        total: reservas.length,
        pendientes: reservasPendientes.length,
        aprobadas: reservasAprobadas.length,
        rechazadas: reservasRechazadas.length
      },
      datos: reservas.map(reserva => ({
        libro: reserva.book.title,
        usuario: reserva.userName,
        email: reserva.userEmail,
        fecha: new Date(reserva.reservationDate).toLocaleDateString(),
        status: reserva.status
      }))
    };

    return reporte;
  };

  const generarReporteLibros = () => {
    const librosDisponibles = libros.filter(libro => libro.disponible);
    const librosPrestados = libros.filter(libro => !libro.disponible);
    
    const generos = [...new Set(libros.map(libro => libro.genero))];
    const librosPorGenero = generos.map(genero => ({
      genero,
      cantidad: libros.filter(libro => libro.genero === genero).length
    }));

    const reporte = {
      titulo: 'Reporte de Inventario de Libros',
      fecha: new Date().toLocaleDateString(),
      resumen: {
        total: libros.length,
        disponibles: librosDisponibles.length,
        prestados: librosPrestados.length
      },
      librosPorGenero,
      datos: libros.map(libro => ({
        titulo: libro.titulo,
        autor: libro.autor,
        editorial: libro.editorial,
        genero: libro.genero,
        isbn: libro.isbn,
        disponible: libro.disponible ? 'Sí' : 'No',
        fechaAgregado: libro.fechaAgregado ? new Date(libro.fechaAgregado).toLocaleDateString() : 'N/A'
      }))
    };

    return reporte;
  };

  const descargarReporte = (reporte) => {
    let contenido = `${reporte.titulo}\n`;
    contenido += `Fecha de generación: ${reporte.fecha}\n`;
    contenido += `=====================================\n\n`;

    if (reporte.resumen) {
      contenido += `RESUMEN:\n`;
      Object.entries(reporte.resumen).forEach(([key, value]) => {
        contenido += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}\n`;
      });
      contenido += `\n`;
    }

    if (reporte.librosPorGenero) {
      contenido += `LIBROS POR GÉNERO:\n`;
      reporte.librosPorGenero.forEach(item => {
        contenido += `${item.genero}: ${item.cantidad} libros\n`;
      });
      contenido += `\n`;
    }

    contenido += `DATOS DETALLADOS:\n`;
    contenido += `=====================================\n`;
    
    reporte.datos.forEach((item, index) => {
      contenido += `${index + 1}. `;
      Object.entries(item).forEach(([key, value]) => {
        contenido += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value} | `;
      });
      contenido += `\n`;
    });

    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reporte.titulo.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const manejarGenerarReporte = () => {
    if (!reporteSeleccionado) {
      alert('Por favor selecciona un tipo de reporte');
      return;
    }

    let reporte;
    switch (reporteSeleccionado) {
      case 'libros_prestados':
        reporte = generarReporteLibrosPrestados();
        break;
      case 'usuarios_bloqueados':
        reporte = generarReporteUsuariosBloqueados();
        break;
      case 'reservas':
        reporte = generarReporteReservas();
        break;
      case 'inventario_libros':
        reporte = generarReporteLibros();
        break;
      default:
        alert('Tipo de reporte no válido');
        return;
    }

    descargarReporte(reporte);
    alert('Reporte generado y descargado exitosamente');
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
            name="editorial"
            value={nuevoLibro.editorial}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <h3>Género:</h3>
          <input
            type="text"
            name="genero"
            value={nuevoLibro.genero}
            onChange={handleInputChange}
            required
          />
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

  // Nuevo formulario para editar libro
  const renderFormularioEdicion = () => (
    <div className="libro-formulario">
      <h3>Editar Libro</h3>
      <form onSubmit={editarLibro}>
        <div className="form-group">
          <h3>Título:</h3>
          <input
            type="text"
            name="titulo"
            value={libroEditando.titulo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <h3>Autor:</h3>
          <input
            type="text"
            name="autor"
            value={libroEditando.autor}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <h3>Editorial:</h3>
          <input
            type="text"
            name="editorial"
            value={libroEditando.editorial}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <h3>Género:</h3>
          <input
            type="text"
            name="genero"
            value={libroEditando.genero}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <h3>Descripción:</h3>
          <textarea
            name="descripcion"
            value={libroEditando.descripcion}
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
          />
          {previewImagen && (
            <div className="imagen-preview">
              <img src={previewImagen} alt="Preview" />
            </div>
          )}
          <p className="help-text">Deja vacío si no quieres cambiar la imagen actual</p>
        </div>
        <div className="form-group">
          <h3>ISBN:</h3>
          <input
            type="text"
            name="isbn"
            value={libroEditando.isbn}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Guardar Cambios
          </button>
          <button 
            type="button" 
            className="btn-cancel"
            onClick={cancelarEdicion}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );

  const renderReportes = () => (
    <div className="admin-section">
      <h2>Generador de Reportes</h2>
      <div className="reportes-container">
        <div className="reporte-selector">
          <h3>Selecciona el tipo de reporte:</h3>
          <div className="reporte-options">
            <label className="reporte-option">
              <input
                type="radio"
                name="tipoReporte"
                value="libros_prestados"
                checked={reporteSeleccionado === 'libros_prestados'}
                onChange={(e) => setReporteSeleccionado(e.target.value)}
              />
              <span className="reporte-label">📚 Libros Prestados</span>
              <p className="reporte-descripcion">Lista de todos los libros actualmente prestados a usuarios</p>
            </label>

            <label className="reporte-option">
              <input
                type="radio"
                name="tipoReporte"
                value="usuarios_bloqueados"
                checked={reporteSeleccionado === 'usuarios_bloqueados'}
                onChange={(e) => setReporteSeleccionado(e.target.value)}
              />
              <span className="reporte-label">🚫 Usuarios Bloqueados</span>
              <p className="reporte-descripcion">Lista de usuarios que han sido bloqueados del sistema</p>
            </label>

            <label className="reporte-option">
              <input
                type="radio"
                name="tipoReporte"
                value="reservas"
                checked={reporteSeleccionado === 'reservas'}
                onChange={(e) => setReporteSeleccionado(e.target.value)}
              />
              <span className="reporte-label">📋 Reporte de Reservas</span>
              <p className="reporte-descripcion">Resumen completo de todas las reservas (pendientes, aprobadas, rechazadas)</p>
            </label>

            <label className="reporte-option">
              <input
                type="radio"
                name="tipoReporte"
                value="inventario_libros"
                checked={reporteSeleccionado === 'inventario_libros'}
                onChange={(e) => setReporteSeleccionado(e.target.value)}
              />
              <span className="reporte-label">📊 Inventario de Libros</span>
              <p className="reporte-descripcion">Reporte completo del inventario con estadísticas por género</p>
            </label>
          </div>
        </div>

        <div className="reporte-actions">
          <button 
            className="btn-generar-reporte"
            onClick={manejarGenerarReporte}
            disabled={!reporteSeleccionado}
          >
            📄 Generar y Descargar Reporte
          </button>
        </div>

        <div className="reporte-info">
          <h4>ℹ️ Información sobre los reportes:</h4>
          <ul>
            <li>Los reportes se generan en formato de texto plano (.txt)</li>
            <li>Incluyen fecha de generación y estadísticas resumidas</li>
            <li>Se descargan automáticamente al navegador</li>
            <li>Contienen información detallada según el tipo seleccionado</li>
          </ul>
        </div>
      </div>
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
    const librosOrdenados = [...libros].sort((a, b) => 
      new Date(b.fechaAgregado) - new Date(a.fechaAgregado)
    );

    return (
      <div className="admin-section">
        <h2>Gestión de Libros</h2>
        {!mostrarFormulario && !libroEditando && (
          <button 
            className="btn-agregar"
            onClick={() => setMostrarFormulario(true)}
          >
            Agregar Nuevo Libro
          </button>
        )}

        {mostrarFormulario && renderFormularioLibro()}
        {libroEditando && renderFormularioEdicion()}

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
                <p className="autor">Autor: {libro.autor}</p>
                <p className="editorial">Editorial: {libro.editorial}</p>
                <p className="genero">Género: {libro.genero}</p>
                <p className="descripcion">{libro.descripcion}</p>
                <p className="isbn">ISBN: {libro.isbn}</p>
              </div>
              <div className="libro-actions">
                <button 
                  className="btn-editar"
                  onClick={() => iniciarEdicion(libro)}
                  title="Editar libro"
                >
                  ✏️ Editar
                </button>
                <button 
                  className="btn-eliminar"
                  onClick={() => eliminarLibro(libro.id)}
                  title="Eliminar libro"
                >
                  🗑️ Eliminar
                </button>
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
        <button 
          className={`nav-button ${activeSection === 'reportes' ? 'active' : ''}`}
          onClick={() => setActiveSection('reportes')}
        >
          Generar Reportes
        </button>
      </div>

      <div className="admin-content">
        {activeSection === 'reservas' && renderReservas()}
        {activeSection === 'libros' && renderLibros()}
        {activeSection === 'usuarios' && renderUsuarios()}
        {activeSection === 'reportes' && renderReportes()}
      </div>
    </div>
  );
};

export default AdminPanel;