import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Loading from '../components/Loading';
import '../assets/styles/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
  });
  const [paymentStatus, setPaymentStatus] = useState('');
  const [shippingFee, setShippingFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Gestion des changements de saisie du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fonction pour calculer les frais de livraison en fonction du poids
  const calculateShippingFee = (totalWeight) => {
    if (totalWeight <= 1) return 14.90;
    if (totalWeight <= 2) return 15.60;
    if (totalWeight <= 5) return 17.70;
    if (totalWeight <= 10) return 21.20;
    if (totalWeight <= 20) return 29.20;
    if (totalWeight <= 25) return 33.45;
    if (totalWeight <= 30) return 37.70;
    return 42.15; // Pour les colis de plus de 30kg
  };

  // Calcul du montant total des articles dans le panier et des frais de livraison
  const calculateTotal = () => {
    const amount = cartItems.reduce((acc, item) => acc + item.price, 0);
    setTotalAmount(amount);

    // Calcul du poids total des produits
    const totalWeight = cartItems.reduce((acc, item) => acc + item.weight, 0); // Assure-toi que chaque produit a une propriété 'weight'
    
    const shippingCost = calculateShippingFee(totalWeight); // Calcul des frais de livraison
    setShippingFee(shippingCost);
  };

  // Effet pour recalculer le total à chaque modification du panier ou des informations de livraison
  useEffect(() => {
    calculateTotal();
  }, [cartItems, formData.zipCode]);

  // Gestion de l'envoi du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentStatus(''); 

    // Simuler le traitement du paiement
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStatus('Paiement réussi !');
      clearCart(); // Vider le panier après un paiement réussi
    }, 2000);
  };

  // Si le panier est vide, afficher un message
  if (cartItems.length === 0) {
    return <div className="checkout-message">Votre panier est vide.</div>;
  }

  return (
    <div className="checkout">
      <h2>Finalisation de la commande</h2>

      {isProcessing ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="shipping-info">
            <h3>Informations de livraison</h3>
            <label>
              Nom :
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Email :
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Adresse :
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Ville :
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Code Postal :
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>

          <div className="cart-summary">
            <h3>Récapitulatif de votre panier</h3>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <p>{item.name}</p>
                  <p>{item.price}€</p>
                  <p><strong>Dimensions :</strong> {item.dimensions}</p> {/* Ajout des dimensions */}
                </div>
              </div>
            ))}
            <div className="total">
              <p>Total des articles : {totalAmount}€</p>
              <p>Frais de livraison : {shippingFee}€</p>
              <p>Total à payer : {totalAmount + shippingFee}€</p>
            </div>
          </div>

          {/* PayPal Button */}
          <div className="paypal-btn">
            <div id="paypal-button-container"></div>
          </div>

          <button type="submit" className="submit-btn">Payer</button>
        </form>
      )}

      {paymentStatus && <div className="payment-status">{paymentStatus}</div>}
    </div>
  );
};

export default Checkout;
