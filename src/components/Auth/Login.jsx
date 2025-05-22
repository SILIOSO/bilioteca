import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../utils/userService';
import './Auth.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    correo: '',
    contraseña: ''
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

    try {
      // Intentar iniciar sesión
      const user = loginUser(formData.correo, formData.contraseña);
      
      // Si el login es exitoso, actualizar el estado de la app
      onLogin(user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="user-icon-large"></div>
          <h2>INICIAR SESIÓN</h2>
        </div>

        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
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
          
          <button type="submit" className="auth-button">
            INICIAR SESIÓN
          </button>
        </form>
        
        <div className="auth-footer">
          <button 
            onClick={() => navigate('/registro')} 
            className="create-account-button"
          >
            CREAR CUENTA
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login; 