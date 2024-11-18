import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import productsData from '../data/products.json';
import '../assets/styles/ProductPage.css';

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, cartItems } = useContext(CartContext);
  const [productInCart, setProductInCart] = useState(false);

  useEffect(() => {
    console.log("ID du produit dans l'URL :", productId);
    const foundProduct = productsData.find((prod) => String(prod.id) === productId);
    setProduct(foundProduct);
  }, [productId]);

  useEffect(() => {
    if (product) {
      const isInCart = cartItems.some(item => item.id === product.id);
      setProductInCart(isInCart);
    }
  }, [cartItems, product]);

  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  const handleAddToCart = () => {
    addToCart(product); 
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
          disabled={productInCart}
        >
          {productInCart ? "Déjà dans le panier" : "Ajouter au panier"}
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
