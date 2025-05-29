import React, { useState, useEffect } from 'react';
import './AdminLibros.css';

const AdminLibros = () => {
  const [libros, setLibros] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [libroEditando, setLibroEditando] = useState(null);
  const [nuevoLibro, setNuevoLibro] = useState({
    titulo: '',
    autor: '',
    descripcion: '',
    imagen: '',
    isbn: '',
    disponible: true
  });

  useEffect(() => {
    cargarLibros();
  }, []);

  const cargarLibros = async () => {
    try {
      const response = await fetch('/api/books');
      const data = await response.json();
      setLibros(data);
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

  const agregarLibro = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoLibro),
      });

      if (response.ok) {
        const libroAgregado = await response.json();
        setLibros([...libros, libroAgregado]);
        setNuevoLibro({
          titulo: '',
          autor: '',
          descripcion: '',
          imagen: '',
          isbn: '',
          disponible: true
        });
        setMostrarFormulario(false);
      }
    } catch (error) {
      console.error('Error al agregar libro:', error);
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

  const renderFormulario = () => (
    <div className="libro-formulario">
      <h3>{libroEditando ? 'Editar Libro' : 'Agregar Nuevo Libro'}</h3>
      <form onSubmit={libroEditando ? editarLibro : agregarLibro}>
        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={libroEditando ? libroEditando.titulo : nuevoLibro.titulo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Autor:</label>
          <input
            type="text"
            name="autor"
            value={libroEditando ? libroEditando.autor : nuevoLibro.autor}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={libroEditando ? libroEditando.descripcion : nuevoLibro.descripcion}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>URL de la imagen:</label>
          <input
            type="text"
            name="imagen"
            value={libroEditando ? libroEditando.imagen : nuevoLibro.imagen}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>ISBN:</label>
          <input
            type="text"
            name="isbn"
            value={libroEditando ? libroEditando.isbn : nuevoLibro.isbn}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            {libroEditando ? 'Guardar Cambios' : 'Agregar Libro'}
          </button>
          <button 
            type="button" 
            className="btn-cancel"
            onClick={() => {
              setMostrarFormulario(false);
              setLibroEditando(null);
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="admin-libros">
      {!mostrarFormulario && !libroEditando && (
        <button 
          className="btn-agregar"
          onClick={() => setMostrarFormulario(true)}
        >
          Agregar Nuevo Libro
        </button>
      )}

      {(mostrarFormulario || libroEditando) && renderFormulario()}

      <div className="libros-grid">
        {libros.map(libro => (
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
            <div className="libro-actions">
              <button 
                className="btn-editar"
                onClick={() => setLibroEditando(libro)}
              >
                Editar
              </button>
              <button 
                className="btn-eliminar"
                onClick={() => eliminarLibro(libro.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLibros; 