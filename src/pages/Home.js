import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/styles/Home.css';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Fetch product data from the public folder
    fetch('/data/products.json')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading products data:', error);
        setLoading(false);
      });
  }, []);

  // Filtrer les produits pour exclure ceux dont le statut est "vendu"
  const featuredProducts = products.filter((product) => product.status !== 'vendu');
  const latestProducts = featuredProducts.slice(-4);  // Sélectionner les 4 derniers produits filtrés

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="home">
      <section className="home-presentation">
        <h1>Bienvenue sur MWD Boutique</h1>
        <p>Découvrez des tableaux uniques créés par une artiste indépendante.</p>
        <Link to="/shop" className="shop-now-btn">Acheter maintenant</Link>
      </section>

      <section className="featured-products">
        <h2>Produits en vedette</h2>
        <div className="product-list">
          {latestProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="about-artist">
        <h2>À propos de l'artiste</h2>
        <p>Je suis une artiste passionnée, créant des œuvres uniques inspirées par la beauté de la nature et de l'âme humaine. Chaque tableau raconte une histoire et vous invite à explorer de nouveaux horizons visuels.</p>
        <Link to="/about" className="about-btn">En savoir plus</Link>
      </section>
    </div>
  );
};

export default Home;
