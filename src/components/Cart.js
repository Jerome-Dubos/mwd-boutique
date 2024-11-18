import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart } = useCart();

  const getTotal = () => {
    return cart.length * 100;
  };

  return (
    <div className="cart">
      <h2>Votre Panier</h2>
      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        cart.map((product, index) => (
          <div key={index} className="cart-item">
            <img src={product.image} alt={product.title} />
            <div>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
            </div>
          </div>
        ))
      )}
      <div className="total">
        <p>Total : {getTotal()}€</p>
      </div>
    </div>
  );
};

export default Cart;
