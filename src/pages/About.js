import React, { useEffect, useState } from 'react';
import '../assets/styles/About.css';

const About = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/data/products.json')
      .then((response) => response.json()) 
      .then((data) => setItems(data))
      .catch((error) => console.error('Erreur lors du chargement du fichier JSON:', error));
  }, []);

  return (
    <section className="about-page">
      <div className="about-artist">
        <h2>À propos de l'artiste</h2>
        <p>
          Découvrez l'histoire de l'artiste, sa passion pour l'art et ses inspirations.
        </p>
        <a href="#gallery" className="about-btn">Voir la galerie des tableaux</a>
      </div>

      {/* Galerie des tableaux */}
      <div id="gallery" className="gallery">
        <h2>Galerie des Tableaux</h2>
        <div className="gallery-list">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div className="gallery-item" key={index}>
                <img src={item.image} alt={item.name} />
                <div className="info">
                  <h3>{item.name}</h3>
                  <p className={`status ${item.status}`}>
                    {item.status === "available" ? "Disponible" : "Vendu"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>Chargement des tableaux...</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default About;
