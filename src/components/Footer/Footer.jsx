import React from 'react';
import './footer.css';

function Footer() {
  return (
    <div className='piePagina'>
      <hr />
      <div className="footer-content">
        <div className="footer-section">
          <h3>Todo Pizza...!!!</h3>
          <p>La mejor pizza hecha con amor y tradición italiana.</p>
        </div>
        <div className="footer-section">
          <h3>Contacto</h3>
          <p>Dirección: Calle Falsa 123, Ciudad</p>
          <p>Teléfono: +123 456 789</p>
          <p>Email: info@todopizza.com</p>
        </div>
        <div className="footer-section">
          <h3>Síguenos</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 - Todo Pizza...!!! - Todos los derechos reservados</p>
      </div>
    </div>
  );
}

export default Footer;