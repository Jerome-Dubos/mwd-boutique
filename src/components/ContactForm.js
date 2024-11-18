import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: 'Demande de tableau sur mesure',
  });
  const [isFormSent, setIsFormSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Envoi de l'email à l'artiste avec la demande
      await emailjs.send('service_ebnq1km', 'template_ssspmmi', {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      }, 'jc8EFGtSqkRdXzCct');

      // Envoi de l'email automatique de confirmation à l'utilisateur
      await emailjs.send('service_ebnq1km', 'template_kqhzhd4', {
        to_name: formData.name,
        to_email: formData.email,
        message: formData.message,
      }, 'jc8EFGtSqkRdXzCct');

      setIsFormSent(true);
      setFormData({ name: '', email: '', message: '', subject: 'Demande de tableau sur mesure' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form">
      <h2>Demande de Tableau Sur Mesure</h2>
      {isFormSent && <p>Votre demande a été envoyée avec succès !</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
