import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-links">
        <p>Encuéntranos en nuestras redes sociales:</p>
        <div className="social-icons">
          <a href="https://instagram.com" className="social-icon instagram" aria-label="Instagram"></a>
          <a href="https://whatsapp.com" className="social-icon whatsapp" aria-label="WhatsApp"></a>
          <a href="https://tiktok.com" className="social-icon tiktok" aria-label="TikTok"></a>
          <a href="https://twitter.com" className="social-icon twitter" aria-label="Twitter"></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;