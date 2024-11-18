import React from 'react';
import '../assets/styles/Error.css'

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>Oups !</h1>
      <h2>Une erreur est survenue.</h2>
      <p>Nous sommes désolés, mais il semble qu'il y ait un problème avec la page que vous recherchez.</p>
      <button onClick={() => window.location.href = '/'}>
        Retour à l'accueil
      </button>
    </div>
  );
};

export default ErrorPage;
