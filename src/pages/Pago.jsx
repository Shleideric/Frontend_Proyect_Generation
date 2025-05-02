import React, { useState } from 'react';
import './Pago.css';
import { useUser } from '../Context/UserContext';

const Pago = () => {
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del pago:', formData);
    alert('Pago procesado con éxito');
  };

  return (
    <div className="pago-container">
      <h1>Información de Pago</h1>
      <form onSubmit={handleSubmit} className="pago-form">
        <div className="form-group">
          <label htmlFor="cardName">Nombre en la tarjeta</label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            placeholder="Nombre completo"
            value={formData.cardName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cardNumber">Número de tarjeta</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expiryDate">Fecha de expiración</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/AA"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="123"
              value={formData.cvv}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="address">Domicilio</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Calle y número"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">Ciudad</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Ciudad"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="postalCode">Código Postal</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              placeholder="00000"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">País</label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="País"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="pago-button">Procesar Pago</button>
      </form>
    </div>
  );
};

export default Pago;