import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./Context/CardProvider.jsx";
import BancoSimple from "./pages/Banco/BancoSimple.jsx";
import LoginBanco from "./pages/Banco/loginBanco.jsx";
import RegisterBanco from "./pages/Banco/registerBanco.jsx";
import { UserProvider } from "./Context/UserContext.jsx";
// import HomeBanco from "./pages/Banco/HomeBanco.jsx";
import Home from "./pages/Banco/Home.jsx";

createRoot(document.getElementById("root")).render(
  <UserProvider>
  <CartProvider>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          {/* Ruta para la tienda */}
          <Route path="/*" element={<App />} />
          {/* Ruta para BancoSimple */}
          <Route path="/bancoSimple" element={<BancoSimple />} />
          <Route path="/bancoSimple/loginBanco" element={<LoginBanco />} />
          <Route path="/bancoSimple/registerBanco" element={<RegisterBanco />} />
          {/* <Route path="/bancoSimple/homeBanco" element={<HomeBanco />} /> */}
          <Route path="/bancoSimple/home" element={<Home />} />
          {/* Ruta para el home */}
          {/* Ruta para el carrito */}
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </CartProvider>
  </UserProvider>
);