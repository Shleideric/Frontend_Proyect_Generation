import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("usuario", JSON.stringify(userData));
    setUsuario(userData);
  };
  const loginBanco = (userData) => {
    setUsuario(userData);
    localStorage.setItem("usuario", JSON.stringify(userData));
    
  };

  const logout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
  };


  return (
    <UserContext.Provider value={{ usuario, setUsuario, login, logout, loginBanco }}>
      {children}
    </UserContext.Provider>
  );
  
};