import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard'; // Assurez-vous de créer un composant ProductCard
import products from '../data/products.json'
import AOS from 'aos';
import 'aos/dist/aos.css'; // Importation des styles de AOS
import '../assets/styles/Home.css';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialisation d'AOS avec une durée d'animation de 1 seconde
  }, []);
  const latestProducts = products.slice(-4);

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
