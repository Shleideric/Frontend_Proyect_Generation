import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    // Cargar carrito desde localStorage al iniciar
    const savedCart = localStorage.getItem("carrito");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const eliminarDelCarrito = (productoId) => {
    setCarrito((prevCarrito) => prevCarrito.filter((producto) => producto.id !== productoId));
  };

  // Sincronizar carrito con localStorage
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto, cantidad) => {
    setCarrito((prevCarrito) => {
        const index = prevCarrito.findIndex((p) => p.id === producto.id);
        if (index !== -1) {
            // Si el producto ya existe, sumar la cantidad
            const nuevoCarrito = [...prevCarrito];
            nuevoCarrito[index].cantidad += cantidad;
            return nuevoCarrito;
        } else {
            // Si el producto no existe, agregarlo con la cantidad inicial
            return [...prevCarrito, { ...producto, cantidad }];
        }
    });
};

  const limpiarCarrito = () => setCarrito([]);

  const sincronizarCarritoConBackend = async (userId) => {
    try {
      // Ejemplo de sincronización con un backend
      const response = await fetch(`/api/carrito/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carrito),
      });
      if (!response.ok) {
        throw new Error("Error al sincronizar el carrito con el servidor");
      }
    } catch (error) {
      console.error("Error al sincronizar el carrito:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        limpiarCarrito,
        sincronizarCarritoConBackend,
        eliminarDelCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};