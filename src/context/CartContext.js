import React, { createContext, useState, useContext } from 'react';

// Créer le contexte du panier
export const CartContext = createContext();

// Fournisseur du contexte du panier
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Fonction pour ajouter un produit au panier
  const addToCart = (product) => {
    // Vérifie si le produit est déjà dans le panier
    const existingProduct = cartItems.find(item => item.id === product.id);

    if (!existingProduct) {
      // Si le produit n'est pas dans le panier, on l'ajoute avec quantité 1
      setCartItems(prevItems => [...prevItems, { ...product, quantity: 1 }]);
    } else {
      // Si le produit est déjà dans le panier, on n'ajoute pas un autre exemplaire
      console.log("Ce produit est déjà dans le panier.");
    }
  };

  // Fonction pour enlever un produit du panier
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Fonction pour vider le panier
  const clearCart = () => {
    setCartItems([]);
  };

  // Fonction pour mettre à jour la quantité d'un produit dans le panier
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) return; // Evite une quantité inférieure ou égale à 0
    setCartItems(prevItems => prevItems.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personnalisé pour accéder au panier
export const useCart = () => useContext(CartContext);
