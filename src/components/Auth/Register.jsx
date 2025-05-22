import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../utils/userService';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    confirmarContraseña: ''
  });
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.contraseña !== formData.confirmarContraseña) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      // Registrar el nuevo usuario
      registerUser({
        name: formData.nombre,
        email: formData.correo,
        password: formData.contraseña
      });

      // Mostrar mensaje de éxito y redirigir al login
      alert('¡Registro exitoso! Por favor, inicia sesión.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="user-icon-large"></div>
          <h2>CREAR CUENTA</h2>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="Correo"
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              placeholder="Contraseña"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="confirmarContraseña"
              value={formData.confirmarContraseña}
              onChange={handleChange}
              placeholder="Confirmar Contraseña"
              required
            />
          </div>
          
          <button type="submit" className="auth-button">
            CREAR CUENTA
          </button>
        </form>
        
        <div className="auth-footer">
          <button 
            onClick={() => navigate('/login')} 
            className="create-account-button"
          >
            VOLVER AL LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register; 