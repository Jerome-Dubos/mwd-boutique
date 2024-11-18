import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../assets/styles/CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const [removingItemId, setRemovingItemId] = useState(null);

  // Gestion de la suppression avec animation
  const handleRemoveItem = (id) => {
    setRemovingItemId(id);
    setTimeout(() => {
      removeFromCart(id);
      setRemovingItemId(null);
    }, 400);
  };

  // Vider le panier avec animation
  const handleClearCart = () => {
    document.querySelector('.cart-items').classList.add('emptying');
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-page">
      <h1>Votre Panier</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Votre panier est vide.</p>
          <Link to="/shop" className="shop-link">
            Retourner à la boutique
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className={`cart-items ${cartItems.length === 0 ? 'emptying' : ''}`}>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className={`cart-item ${removingItemId === item.id ? 'removing' : ''}`}
              >
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h2>{item.title}</h2>
                  {item.dimensions && (
                    <p className="cart-item-dimensions">Dimensions : {item.dimensions}</p>
                  )}
                  <p>{item.category}</p>
                  <p className="cart-item-price">{item.price}€</p>
                  <p className="cart-item-quantity">Quantité : {item.quantity}</p>
                  <button
                    className="remove-item"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total : {getTotal()}€</h3>
            <button className="clear-cart" onClick={handleClearCart}>
              Vider le panier
            </button>
            <Link to="/checkout" className="checkout-btn">
              Passer à la caisse
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
