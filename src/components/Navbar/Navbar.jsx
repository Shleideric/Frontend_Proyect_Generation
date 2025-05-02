import React from "react";
import logo from '../../assets/logo.jpeg';
import cart from '../../assets/cart.svg';
import Tulio from '../../assets/Tulio.png';
import './Navbar.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Importamos el hook useTheme desde nuestro contexto de tema personalizado
import { useTheme } from "../../Context/themeContext";
import { useUser } from "../../Context/UserContext";


export default function Navbar() {
  // Extraemos los valores del contexto de tema:
  // - darkMode: boolean que indica si el modo oscuro está activo
  // - toggleTheme: función para alternar entre temas
  // - colors: objeto con los colores del tema actual
  const { darkMode, toggleTheme, colors} = useTheme();
  const { usuario, logout } = useUser()

  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto((prev) => !prev);
  };

  // Cierra sesión y redirige
  const cerrarSesion = () => {
    logout();
    setMenuAbierto(false);
  };

  
  return (
    <div
      className="navbar"
      style={{
        // Color de fondo según el tema
        backgroundColor: colors.navBar,
        // Sombra diferente para modo oscuro/claro
        boxShadow: darkMode
          ? "0 2px 4px rgba(0, 0, 0, 0.3)"
          : "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Logo */}
      
      <div className="nav-logo">
        <Link to="/">
        <img src={logo} alt="logo" />
        </Link>
      </div>

      {/* Menú de navegación con color de texto dinámico */}
      <ul className="nav-menu"
        >
        <Link
          to={"/ecoMarket/electronica"}
          style={{color:colors.text, textDecoration:"none"}}>
        <li style={{ color: colors.text }}>Electrónica</li>
        </Link>
        <Link
          to={"/ecoMarket/ropa"}
          style={{color:colors.text, textDecoration:"none"}}>
        <li style={{ color: colors.text }}>Ropa</li>
        </Link>
        <Link
          to={"/ecoMarket/hogar"}
          style={{color:colors.text, textDecoration:"none"}}>
        <li style={{ color: colors.text }}>Hogar</li>
        </Link>
        <Link
          to={"/ecoMarket/deportes"}
          style={{color:colors.text, textDecoration:"none"}}>
        <li style={{ color: colors.text }}>Deportes</li>
        </Link>
        <Link
          to={"/ecoMarket/juguetes"}
          style={{color:colors.text, textDecoration:"none"}}>
        <li style={{ color: colors.text }}>Juguetes</li>
        </Link>
        
      </ul>

      {/* Contenedor de login/carrito/tema */}
      <div className="nav-login-cart">
        <Link  to="/ecoMarket/carrito" style={{textDecoration:"none"}}>
        <img className="carrito-img" src={cart} alt="carrito"/>
        </Link>
        

        {usuario ? (
        <div style={{ position: "relative", marginRight: "1rem" }}>
          <div
            onClick={toggleMenu}
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#46A46B",
              borderRadius: "10px",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              userSelect: "none",
              boxShadow: "4px 4px 1px rgba(17, 23, 75, 1)",
            }}
          >
            <img
              src={Tulio}
              alt="Foto de perfil"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginRight: "0.75rem",
                objectFit: "cover",
              }}
            />
            <span
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "1.1rem",
                marginRight: "0.5rem",
              }}
            >
              {usuario.username}
            </span>
            <span style={{ fontSize: "1.2rem" }}>{menuAbierto ? "▲" : "▼"}</span>
          </div>

          {menuAbierto && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                marginTop: "0.5rem",
                zIndex: 1000,
                minWidth: "180px",
              }}
            >
              <Link
                to="/ecoMarket/perfil"
                style={{
                  display: "block",
                  padding: "0.75rem 1rem",
                  textDecoration: "none",
                  color: "#333",
                }}
                onClick={() => setMenuAbierto(false)}
              >
                Mi perfil
              </Link>
              <Link
                to="/bancoSimple"
                style={{
                  display: "block",
                  padding: "0.75rem 1rem",
                  textDecoration: "none",
                  color: "#333",
                }}
                onClick={() => setMenuAbierto(false)}
              >
                Sistema Bancario
              </Link>
              <div
                onClick={cerrarSesion}
                style={{
                  padding: "0.75rem 1rem",
                  cursor: "pointer",
                  color: "#b30000",
                  fontWeight: "bold",
                }}
              >
                Cerrar sesión
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link to="/ecoMarket/login">
          <button
            style={{
              height: "50px",
              width: "100px",

              borderColor: colors.primary,
              color: colors.login,
              boxShadow: "4px 4px 1px rgba(17, 23, 75, 1)",
            }}
          >
            Login
          </button>
        </Link>
      )}

        
        

        {/* Botón para alternar entre temas */}
        <button
          onClick={toggleTheme}
          style={{
            fontSize: "1.3rem",
            marginLeft: "1rem",
            padding: "0.5rem",
            background: "transparent",
            border: "1px solid",
            borderRadius: "50%",
            cursor: "pointer",
            color: colors.text, // Color de texto según el tema
          }}
          aria-label={
            darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
          }
        >
          {darkMode ? "☀️" : "🌓"} {/* Icono solar o lunar según el tema */}
        </button>
      </div>
    </div>
  );
}

