import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Loading from '../components/Loading';
import '../assets/styles/Checkout.css';

const europeanCountries = [
  'Albanie', 'Allemagne', 'Andorre', 'Arménie', 'Autriche', 'Azerbaïdjan', 'Belgique', 'Bosnie-Herzégovine', 'Bulgarie',
  'Chypre', 'Croatie', 'Danemark', 'Estonie', 'Finlande', 'France', 'Géorgie', 'Grèce', 'Hongrie', 'Irlande', 'Islande',
  'Italie', 'Kazakhstan', 'Kosovo', 'Lettonie', 'Liechtenstein', 'Lituanie', 'Luxembourg', 'Malte', 'Moldavie', 'Monaco',
  'Monténégro', 'Norvège', 'Pays-Bas', 'Pologne', 'Portugal', 'République tchèque', 'Roumanie', 'Russie', 'Saint-Marin',
  'Serbie', 'Slovaquie', 'Slovénie', 'Suède', 'Suisse', 'Turquie', 'Ukraine', 'Vatican'
];

const formatPrice = (price) => price.toFixed(2);

const calculateShippingFee = (totalWeight) => {
  if (totalWeight <= 1) return 14.90;
  if (totalWeight <= 2) return 15.60;
  if (totalWeight <= 5) return 17.70;
  if (totalWeight <= 10) return 21.20;
  if (totalWeight <= 20) return 29.20;
  if (totalWeight <= 25) return 33.45;
  if (totalWeight <= 30) return 37.70;
  return 42.15;
};

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', address: '', city: '', zipCode: '', country: ''
  });
  const [errors, setErrors] = useState({});
  const [paymentStatus, setPaymentStatus] = useState('');
  const [shippingFee, setShippingFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};
  
    if (!formData.name) { newErrors.name = 'Le nom est requis'; valid = false; }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) { newErrors.email = 'L\'email est requis et doit être valide'; valid = false; }
    if (!formData.address) { newErrors.address = 'L\'adresse est requise'; valid = false; }
    if (!formData.city) { newErrors.city = 'La ville est requise'; valid = false; }
    // Vérification du code postal (5 chiffres)
    if (!formData.zipCode || !/^\d{5}$/.test(formData.zipCode)) { 
      newErrors.zipCode = 'Le code postal est requis et doit être valide (5 chiffres)';
      valid = false;
    }
    if (!formData.country || !europeanCountries.includes(formData.country)) { newErrors.country = 'Le pays doit être un pays européen'; valid = false; }
  
    setErrors(newErrors); // Update errors state
    return valid;
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const calculateTotal = useMemo(() => {
    const amount = cartItems.reduce((acc, item) => acc + item.price, 0);
    const totalWeight = cartItems.reduce((acc, item) => acc + item.weight, 0);
    setTotalAmount(amount);
    setShippingFee(calculateShippingFee(totalWeight));
  }, [cartItems]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validateForm(); // Validation before submission
    if (!valid) return;

    setIsProcessing(true);
    setPaymentStatus('');

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStatus('Paiement réussi !');
      clearCart();
    }, 2000);
  };

  // Function to determine if field is invalid or valid
  const getFieldClass = (field) => {
    if (errors[field]) {
      return 'invalid'; // Apply 'invalid' class if there's an error
    }
    if (formData[field] && !errors[field]) {
      return 'valid'; // Apply 'valid' class if the field is filled and no error
    }
    return ''; // No class if field is empty and no error
  };

  if (cartItems.length === 0) return <div className="checkout-message">Votre panier est vide.</div>;

  return (
    <div className="checkout">
      <h2>Finalisation de la commande</h2>
      {isProcessing ? <Loading /> : (
        <div className="checkout-content">
          <div className="shipping-info">
            <h3>Informations de livraison</h3>
            <form onSubmit={handleSubmit} className="checkout-form">
              {['name', 'email', 'address', 'city', 'zipCode'].map((field) => (
                <div className="input-group" key={field}>
                  <label htmlFor={field}>{field === 'name' ? 'Nom' : field === 'email' ? 'E-mail' : field === 'address' ? 'Adresse' : field === 'city' ? 'Ville' : 'Code postal'} :</label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    required
                    className={getFieldClass(field)} // Apply valid or invalid class
                  />
                  {errors[field] && <p className="error-message">{errors[field]}</p>}
                </div>
              ))}
              <div className="input-group">
                <label htmlFor="country">Pays :</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className={getFieldClass('country')} // Apply valid or invalid class
                >
                  <option value="">Sélectionner un pays</option>
                  {europeanCountries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                {errors.country && <p className="error-message">{errors.country}</p>}
              </div>
            </form>
          </div>

          <div className="cart-summary">
            <h3>Résumé de la commande</h3>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  <div className="item-image"><img src={item.image} alt={item.name} /></div>
                  <div className="item-details">
                    <p>{item.name}</p>
                    <p>{formatPrice(item.price)} €</p>
                  </div>
                </li>
              ))}
            </ul>
            <p>Frais de livraison : {formatPrice(shippingFee)} €</p>
            <p>Total : {formatPrice(totalAmount + shippingFee)} €</p>

            <div className="payment-section">
              <label>
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={() => setAcceptedTerms(!acceptedTerms)}
                />
                J'accepte les <a href="/terms" target="_blank" rel="noopener noreferrer">conditions générales</a>
              </label>
              <button
                className="pay-button"
                onClick={handleSubmit}
                disabled={!acceptedTerms || !validateForm()}
              >
                Payer
              </button>
            </div>

            {paymentStatus && <p className="payment-status">{paymentStatus}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
