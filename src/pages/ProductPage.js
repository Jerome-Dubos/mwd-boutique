import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Assurez-vous d'importer le contexte
import productsData from '../data/products.json';
import '../assets/styles/ProductPage.css';

const ProductPage = () => {
  const { productId } = useParams(); // Récupère l'ID du produit depuis l'URL
  const [product, setProduct] = useState(null); // État pour stocker les informations du produit
  const { addToCart, cartItems } = useContext(CartContext); // Accède au contexte pour ajouter au panier et récupérer les articles du panier
  const [productInCart, setProductInCart] = useState(false); // État local pour savoir si le produit est dans le panier

  useEffect(() => {
    console.log("ID du produit dans l'URL :", productId); // Vérification de l'ID
    // Trouve le produit avec l'ID dans le fichier JSON
    const foundProduct = productsData.find((prod) => String(prod.id) === productId);
    console.log("Produit trouvé :", foundProduct); // Affiche le produit trouvé dans les logs
    setProduct(foundProduct); // Met à jour l'état avec le produit trouvé
  }, [productId]); // Le useEffect est déclenché à chaque fois que productId change

  useEffect(() => {
    if (product) {
      // Vérifie si le produit est déjà dans le panier
      const isInCart = cartItems.some(item => item.id === product.id);
      setProductInCart(isInCart); // Met à jour l'état productInCart en fonction du panier
    }
  }, [cartItems, product]); // Ce useEffect est exécuté à chaque fois que cartItems change ou que product change

  // Si le produit n'est pas trouvé, afficher un message d'erreur
  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  // Fonction pour ajouter le produit au panier
  const handleAddToCart = () => {
    addToCart(product); // Ajoute le produit au panier via le CartContext
  };

  return (
    <div className="product-page">
      <div className="product-details">
        <img src={product.image} alt={product.name} className="product-image" />
        <h1>{product.name}</h1>
        <p>{product.category}</p>
        <p>{product.description}</p>
        <strong>{product.price}€</strong>

        <button
          className="btn"
          onClick={handleAddToCart}
          disabled={productInCart} // Désactive le bouton si le produit est déjà dans le panier
        >
          {productInCart ? "Déjà dans le panier" : "Ajouter au panier"}
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
