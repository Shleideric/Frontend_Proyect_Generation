import React from 'react';
import { useUser } from '../Context/UserContext';
import Tulio from '../assets/Tulio.png'; // Asegúrate de que la ruta sea correcta
import './Perfil.css';
import { useTheme } from '../Context/themeContext'; // Importa el contexto de tema

const Perfil = () => {
  const { usuario } = useUser();
  const { colors } = useTheme(); // Usamos el contexto del tema

  if (!usuario) {
    return <p>Cargando datos del usuario...</p>;
  }

  return (
    <div style={{
        backgroundColor: colors.cardBackground, // Fondo según el modo
        color: colors.text, // Texto según el modo
        minHeight: "68.7vh"
      }}
    className="perfil-container">
      <div className="perfil-imagen">
        <img src={Tulio} alt="Foto de perfil" />
      </div>
      <div className="perfil-datos">
        <h1>Perfil del Usuario</h1>
        <p><strong>Nombre:</strong> {usuario.username}</p>
        <p><strong>Correo:</strong> {usuario.email}</p>
        {/* Aquí puedes agregar más información del usuario según sea necesario */}
      </div>
    </div>
  );
};

export default Perfil;