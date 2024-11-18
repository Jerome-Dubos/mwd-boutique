import React from 'react';
import '../assets/styles/PrivacyPolicy.css'

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#4a4a75' }}>Politique de Confidentialité de MWD Boutique</h1>
      <p style={{ textAlign: 'center' }}>Dernière mise à jour : Novembre 2024</p>

      <section>
        <h2 style={{ color: '#2e2e38' }}>1. Introduction</h2>
        <p>
          La présente politique de confidentialité a pour but de vous informer sur la manière dont MWD Boutique collecte, utilise, protège et partage vos données personnelles conformément aux exigences de la loi française sur la protection des données personnelles (RGPD).
        </p>
      </section>

      <section>
        <h2 style={{ color: '#2e2e38' }}>2. Données Collectées</h2>
        <p>
          Nous collectons les informations suivantes lors de votre visite sur notre site web :
        </p>
        <ul>
          <li>Nom et prénom</li>
          <li>Adresse e-mail</li>
          <li>Adresse de livraison et de facturation</li>
          <li>Informations de paiement (via un prestataire de paiement sécurisé)</li>
          <li>Historique d'achats et interactions avec le site</li>
        </ul>
      </section>

      <section>
        <h2 style={{ color: '#2e2e38' }}>3. Utilisation des Données</h2>
        <p>
          Les données collectées sont utilisées pour les finalités suivantes :
        </p>
        <ul>
          <li>Traitement des commandes et expédition des produits</li>
          <li>Amélioration de l'expérience client sur notre site web</li>
          <li>Envoi de newsletters et de promotions, si vous y avez consenti</li>
          <li>Répondre à vos demandes et questions</li>
          <li>Conformité légale, notamment pour la facturation</li>
        </ul>
      </section>

      <section>
        <h2 style={{ color: '#2e2e38' }}>4. Consentement et Droit d'Accès</h2>
        <p>
          En utilisant notre site, vous consentez à la collecte et à l'utilisation de vos données personnelles conformément à cette politique. Vous avez le droit de :
        </p>
        <ul>
          <li>Accéder à vos données personnelles que nous détenons</li>
          <li>Demander la rectification de vos données</li>
          <li>Demander la suppression de vos données, dans la limite de la loi</li>
          <li>Retirer votre consentement à tout moment, sans que cela n'affecte la légalité du traitement effectué avant ce retrait</li>
        </ul>
        <p>
          Pour exercer ces droits, vous pouvez nous contacter à l'adresse e-mail suivante : <strong>contact@mwd-boutique.com</strong>.
        </p>
      </section>

      <section>
        <h2 style={{ color: '#2e2e38' }}>5. Sécurité des Données</h2>
        <p>
          Nous prenons toutes les mesures nécessaires pour protéger vos données personnelles contre toute perte, utilisation abusive ou accès non autorisé. Nous utilisons des technologies de sécurité avancées, y compris le chiffrement, pour assurer la protection de vos informations sensibles lors de la transmission.
        </p>
      </section>

      <section>
        <h2 style={{ color: '#2e2e38' }}>6. Partage des Données</h2>
        <p>
          Nous ne partageons vos données personnelles avec des tiers que dans les situations suivantes :
        </p>
        <ul>
          <li>Avec nos prestataires de services (par exemple, pour le traitement des paiements ou l'expédition des produits)</li>
          <li>Si cela est requis par la loi ou pour répondre à une demande légale (par exemple, une ordonnance judiciaire)</li>
          <li>Avec des partenaires, uniquement si vous avez donné votre consentement préalable pour recevoir des informations ou des offres spéciales</li>
        </ul>
      </section>

      <section>
        <h2 style={{ color: '#2e2e38' }}>7. Cookies</h2>
        <p>
          Notre site utilise des cookies pour améliorer l'expérience utilisateur. Ces cookies peuvent être utilisés pour :
        </p>
        <ul>
          <li>Se souvenir de vos préférences et paramètres</li>
          <li>Analyser l'utilisation de notre site web</li>
          <li>Afficher des publicités ciblées (si vous avez accepté de recevoir des cookies publicitaires)</li>
        </ul>
        <p>
          Vous pouvez gérer les paramètres de cookies à tout moment dans les paramètres de votre navigateur.
        </p>
      </section>

      <section>
        <h2 style={{ color: '#2e2e38' }}>8. Modifications de la Politique</h2>
        <p>
          Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page avec une nouvelle date de mise à jour.
        </p>
      </section>

      <section>
        <h2 style={{ color: '#2e2e38' }}>9. Contact</h2>
        <p>
          Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter à l'adresse suivante : <strong><a href="mailto:contact@mwd-boutique.com">contact@mwd-boutique.com</a></strong>.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
