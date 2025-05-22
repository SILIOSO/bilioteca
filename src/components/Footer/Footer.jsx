import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Encuéntranos en nuestras redes sociales</p>
        <div className="social-icons">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram" aria-label="Instagram"></a>
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp" aria-label="WhatsApp"></a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon tiktok" aria-label="TikTok"></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter" aria-label="Twitter"></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 