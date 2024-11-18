import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../assets/styles/Footer.css'

const Footer = () => {
  return (
    <footer className="footer-main">
      <div className="footer-logo">
        <Link to="/">
          <img src={logo} alt="MWD Boutique" />
        </Link>
      </div>
      

      <div className="footer-social-links">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-pinterest"></i>
        </a>
      </div>

      <nav className="footer-nav">
        <ul>
          <li><Link to="/privacy">Politique de confidentialité</Link></li>
          <li><Link to="/terms">Conditions d'utilisation</Link></li>
        </ul>
      </nav>

      <div className="footer-contact-info">
        <p>Contactez-nous : <a href="mailto:contact@mwd-boutique.com">contact@mwd-boutique.com</a></p>
      </div>

      <div className="footer-copyright">
        <p>&copy; {new Date().getFullYear()} MWD Boutique. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
