import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import logo from '../assets/images/logo.png';
import '../assets/styles/Header.css';

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);
  const closeButtonRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Gestion du clic en dehors du menu pour fermer le menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (closeButtonRef.current && event.target === closeButtonRef.current) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setMenuOpen((prevState) => !prevState);

  return (
    <header className="header-main">
      <div className="header-logo">
        <Link to="/">
          <img src={logo} alt="MWD Boutique" />
        </Link>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
        <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
        <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
      </div>
      <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/about">À propos</Link></li>
          <li><Link to="/shop">Boutique</Link></li>
          <li className="cart-link">
            <Link to="/cart">Panier</Link>
            {totalItemsInCart > 0 && (
              <span className="cart-badge">{totalItemsInCart}</span>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
