import React from "react";
import './Nosotros.css';
import { useTheme } from '../../Context/themeContext'; 

const miembrosEquipo = [
  {
    id: 1,
    nombre: "Danileo Lizama",
    rol: "Desarrollador",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZdlHVwqECdSnpSNQhoMEZ2njjK7qce9CI5w&s"
  },
  {
    id: 2,
    nombre: "Simon Chavez",
    rol: "Desarrollador",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZdlHVwqECdSnpSNQhoMEZ2njjK7qce9CI5w&s"
  },
  {
    id: 3,
    nombre: "Gabriel Covarrubias",
    rol: "Product Owner",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZdlHVwqECdSnpSNQhoMEZ2njjK7qce9CI5w&s"
  },
  {
    id: 4,
    nombre: "Midora Sovino",
    rol: "Scrum Master",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZdlHVwqECdSnpSNQhoMEZ2njjK7qce9CI5w&s"
  },
  {
    id: 5,
    nombre: "Norma Armijo",
    rol: "Desarrolladora",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZdlHVwqECdSnpSNQhoMEZ2njjK7qce9CI5w&s"
  },
];

export default function Nosotros() {
  const { colors } = useTheme(); // 2. Usamos el contexto del tema

  return (
    <section
      className="equipo"
      style={{
        backgroundColor: colors.cardBackground, // Fondo según el modo
        color: colors.text, // Texto según el modo
        minHeight: "100vh"
      }}
    >
      <h2 
      style={{ 
        color: colors.primary,
         }}
        >Conoce al equipo</h2>

      <div className="miembros-equipo"
      >
        {miembrosEquipo.map((miembro) => (
          <div
            key={miembro.id}
            className="miembro"
            style={{ color: colors.text }}
          >
            <div
              className="miembro-foto"
              style={{ borderColor: colors.primary }}
            >
              <img 
              src={miembro.foto} 
              alt={miembro.nombre} 
              loading="lazy"
              />
            </div>
            <h3 style={{ color: colors.text }}>{miembro.nombre}</h3>
            <p>{miembro.rol}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
