import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Loading from '../components/Loading';
import '../assets/styles/ProductPage.css';

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, cartItems } = useContext(CartContext);
  const [productInCart, setProductInCart] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("ID du produit dans l'URL :", productId);

    // Fetch product data from the public folder
    fetch('/data/products.json')
      .then((response) => response.json())
      .then((data) => {
        const foundProduct = data.find((prod) => String(prod.id) === productId);
        setProduct(foundProduct);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading product data:', error);
        setLoading(false);
      });
  }, [productId]);

  useEffect(() => {
    if (product) {
      const isInCart = cartItems.some(item => item.id === product.id);
      setProductInCart(isInCart);
    }
  }, [cartItems, product]);

  if (loading) {
    return <Loading />;
  }

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
