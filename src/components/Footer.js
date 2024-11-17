import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../assets/styles/Footer.css'

const Footer = () => {
  return (
    <footer>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="MWD Boutique" />
        </Link>
      </div>
      
      <nav>
        <ul>
          <li><Link to="/about">À propos</Link></li>
          <li><Link to="/privacy">Politique de confidentialité</Link></li>
          <li><Link to="/terms">Conditions d'utilisation</Link></li>
        </ul>
      </nav>

      <div className="social-links">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i> {/* Utilisation d'icônes FontAwesome */}
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-pinterest"></i>
        </a>
      </div>

      <div className="contact-info">
        <p>Contactez-nous : <a href="mailto:contact@mwd-boutique.com">contact@mwd-boutique.com</a></p>
      </div>

      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} MWD Boutique. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
