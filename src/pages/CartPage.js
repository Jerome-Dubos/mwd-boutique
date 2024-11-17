import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Import du CartContext
import '../assets/styles/CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  // Calcul du total du panier
  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-page">
      <h1>Votre Panier</h1>

      {/* Si le panier est vide */}
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Votre panier est vide.</p>
          <Link to="/shop" className="shop-link">Retourner à la boutique</Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {/* Affichage des articles dans le panier */}
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h2>{item.name}</h2>
                  <p>{item.category}</p>
                  <p className="cart-item-price">{item.price}€</p>
                  <p className="cart-item-quantity">Quantité : {item.quantity}</p>
                  <button className="remove-item" onClick={() => removeFromCart(item.id)}>Supprimer</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            {/* Affichage du total */}
            <h3>Total : {getTotal()}€</h3>
            <button className="clear-cart" onClick={clearCart}>Vider le panier</button>
            <Link to="/checkout" className="checkout-btn">Passer à la caisse</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
