import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/ProductCard.css'

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={process.env.PUBLIC_URL + product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p><strong>{product.price} €</strong></p>
      <Link to={`/product/${product.id}`} className="btn">Voir plus</Link>
    </div>
  );
};

export default ProductCard;
