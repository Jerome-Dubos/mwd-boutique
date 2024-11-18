import React, { useEffect, useState } from 'react';
import '../assets/styles/About.css';
import Loading from '../components/Loading';
import ContactForm from '../components/ContactForm';

const About = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/data/products.json')
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement du fichier JSON:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="about-page">
      {/* Présentation de l'artiste */}
      <div className="artist-introduction">
        <h2>À propos de l'artiste</h2>
        <div className="artist-details">
          <img
            src="https://via.placeholder.com/300x400" // Remplacer par l'image de l'artiste
            alt="L'artiste"
            className="artist-photo"
          />
          <div className="artist-description">
            <p>
              [Nom de l'artiste] est une artiste passionnée, spécialisée dans la peinture
              contemporaine. Ses œuvres sont inspirées par la nature, les émotions humaines et
              l'exploration des couleurs. À travers ses tableaux, elle cherche à capturer l'essence
              de l'instant et à évoquer des sentiments profonds.
            </p>
          </div>
        </div>
      </div>

      {/* Galerie des tableaux */}
      <div id="gallery" className="gallery">
        <h2>Galerie des Tableaux</h2>
        <div className="gallery-list">
          {isLoading ? (
            <Loading />
          ) : (
            items.length > 0 ? (
              items.map((item, index) => (
                <div className="gallery-item" key={index}>
                  <img src={item.image} alt={item.name} />
                  <div className="info">
                    <h3>{item.name}</h3>
                    <p className={`status ${item.status}`}>
                      {item.status === 'disponible' ? 'Disponible' : 'Vendu'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>Aucun tableau trouvé.</p>
            )
          )}
        </div>
      </div>
      <ContactForm />
    </section>
  );
};

export default About;
