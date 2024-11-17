import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Import du CartContext
import logo from '../assets/images/logo.png';
import '../assets/styles/Header.css';

const Header = () => {
  // Utilisation du CartContext pour obtenir les éléments du panier
  const { cartItems } = useContext(CartContext);

  // Calculer le nombre total d'articles dans le panier
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="MWD Boutique" />
        </Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/shop">Boutique</Link></li>
          <li className="cart-link">
            <Link to="/cart">Panier</Link>
            {totalItemsInCart > 0 && (
              <span className="cart-badge">{totalItemsInCart}</span> // Affichage du badge avec le nombre d'articles
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
