import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Loading from '../components/Loading'; // Import Loading component
import '../assets/styles/Shop.css';

const Shop = () => {
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const [filters, setFilters] = useState({ category: '', price: [0, 2500] });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Updated to 8 products per page
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    // Fetch product data from the public folder
    fetch('/data/products.json')
      .then((response) => response.json())
      .then((data) => {
        setProductsData(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Error loading products data:', error);
        setLoading(false); // Handle errors and stop loading
      });
  }, []);

  const handleFilterChange = (e, category) => {
    if (category) {
      setFilters((prevState) => ({
        ...prevState,
        category: prevState.category === category ? '' : category,
      }));
    } else {
      setFilters((prevState) => ({
        ...prevState,
        price: [prevState.price[0], e.target.value],
      }));
    }
  };

  const resetFilters = () => {
    setFilters({ category: '', price: [0, 2500] });
  };

  // Function to navigate to the product page
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Filter products based on selected category, price range, and exclude sold items
  const filteredProducts = productsData.filter((product) => {
    const [minPrice, maxPrice] = filters.price;
    const inPriceRange = product.price >= minPrice && product.price <= maxPrice;
    const inCategory = filters.category ? product.category === filters.category : true;
    const isAvailable = product.status !== 'vendu'; // Exclude products that are sold
    return inPriceRange && inCategory && isAvailable;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // If loading, show the Loading component
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="shop">
      <div className="filters">
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
        {currentProducts.map((product) => {
          const isInCart = cartItems.some((item) => item.id === product.id);
          return (
            <div
              className="product-card"
              key={product.id}
              onClick={() => handleProductClick(product.id)}
            >
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <p><strong>{product.price}€</strong></p>
              <p><strong className='product-dimensions'>Dimensions :</strong> {product.dimensions}</p> {/* Affichage des dimensions */}
              <button
                className={`btn ${isInCart ? 'disabled' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  !isInCart && addToCart(product);
                }}
                disabled={isInCart}
              >
                {isInCart ? 'Dans le panier' : 'Ajouter au panier'}
              </button>
            </div>
          );
        })}
      </div>

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
