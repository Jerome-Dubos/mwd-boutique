import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // Importation du hook
import productsData from '../data/products.json';
import '../assets/styles/Shop.css'; // Importation du CSS

const Shop = () => {
  const { addToCart, cartItems } = useCart(); // Accès à addToCart et cartItems
  const [filters, setFilters] = useState({ category: '', price: [0, 2500] });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const handleFilterChange = (e, category) => {
    if (category) {
      setFilters(prevState => ({
        ...prevState,
        category: prevState.category === category ? '' : category,
      }));
    } else {
      setFilters(prevState => ({
        ...prevState,
        price: [prevState.price[0], e.target.value],
      }));
    }
  };

  const resetFilters = () => {
    setFilters({ category: '', price: [0, 2500] });
  };

  // Filtrage des produits
  const filteredProducts = productsData.filter((product) => {
    const [minPrice, maxPrice] = filters.price;
    const inPriceRange = product.price >= minPrice && product.price <= maxPrice;
    const inCategory = filters.category ? product.category === filters.category : true;
    return inPriceRange && inCategory;
  });

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculer le nombre de pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Fonction pour changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="shop">
      <div className="filters">
        {/* Filtres par catégorie et prix */}
        <div className="category-filters">
          <button
            className={`filter-btn ${filters.category === 'Abstrait' ? 'active' : ''}`}
            onClick={(e) => handleFilterChange(e, 'Abstrait')}
          >
            Abstrait
          </button>
          <button
            className={`filter-btn ${filters.category === 'Paysage' ? 'active' : ''}`}
            onClick={(e) => handleFilterChange(e, 'Paysage')}
          >
            Paysage
          </button>
          <button
            className={`filter-btn ${filters.category === 'Portrait' ? 'active' : ''}`}
            onClick={(e) => handleFilterChange(e, 'Portrait')}
          >
            Portrait
          </button>
        </div>

        <div className="price-filter">
          <label>Prix Max :</label>
          <input
            type="range"
            name="price"
            min="0"
            max="2500"
            step="10"
            value={filters.price[1]}
            onChange={(e) => handleFilterChange(e)}
            className="price-slider"
          />
          <span>{`De ${filters.price[0]} à ${filters.price[1]}€`}</span>
        </div>

        <button className="reset-filters" onClick={resetFilters}>
          Réinitialiser les filtres
        </button>
      </div>

      <div className="product-list">
        {currentProducts.map(product => {
          const isInCart = cartItems.some(item => item.id === product.id);
          return (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <p><strong>{product.price}€</strong></p>
              <button
                className={`btn ${isInCart ? 'disabled' : ''}`} // Ajout de la classe disabled
                onClick={() => !isInCart && addToCart(product)} // Ajouter au panier si non présent
                disabled={isInCart} // Désactiver le bouton si déjà dans le panier
              >
                {isInCart ? 'Dans le panier' : 'Ajouter au panier'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Précédent
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="pagination-btn"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;
