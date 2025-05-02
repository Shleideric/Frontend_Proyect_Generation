import GridProducto from "../components/Producto/GridProducto";
import { useTheme } from "../Context/themeContext";
import api from "../api/api";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useCart } from "../Context/CardProvider";

const ProductoDetalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const { colors } = useTheme();
    const { agregarAlCarrito } = useCart(); // Cambiado: desestructurar como objeto
    
    
    

    const handleAgregarCarrito = (producto, cantidad) => {
        const cantidadDeseada = parseInt(cantidad);
        if (cantidadDeseada <= producto.stock) {
            const productoCopia = { ...producto };
            productoCopia.stock = cantidadDeseada;
    
            producto.stock -= cantidadDeseada; // Actualizar el stock del producto original
            console.log("Producto agregado al carrito:", producto, cantidadDeseada);
            console.log("Producto después de agregar al carrito:", productoCopia);
    
            // Llamar a agregarAlCarrito con el producto y la cantidad deseada
            agregarAlCarrito(producto, cantidadDeseada);
    
            alert(`Agregaste ${cantidadDeseada} unidades de ${producto.product_name} al carrito.`);
        } else {
            alert(`No hay suficiente stock. Solo quedan ${producto.stock} unidades.`);
        }
    };

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await api.get(`/products/product/${id}`);
                console.log(id, response.data);
                setProducto(response.data);
            } catch (error) {
                console.error("Error al obtener el producto:", error);
            }
        };
        fetchProducto();
    }, [id]);

    if (!producto) {
        return <div>Cargando...</div>;
    }

    return (
        <section
            style={{
                backgroundColor: colors.background,
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Imagen */}
            <div style={{ display: "flex", padding: "2rem", gap: "2rem", alignItems: "flex-start" }}>
                <div
                    style={{
                        flex: "0 0 400px",
                        height: "400px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        overflow: "hidden",
                        marginLeft: "10rem",
                    }}
                >
                    <img
                        src={producto.img_Url}
                        alt={producto.product_name}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                        }}
                    />
                </div>

                {/* Texto */}
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "2rem",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        minHeight: "400px",
                        backgroundColor: "white",
                        marginRight: "10rem",
                    }}
                >
                    {/* Nombre del producto */}
                    <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{producto.product_name}</h1>

                    {/* Descripción, precio y stock */}
                    <div style={{ marginBottom: "2rem" }}>
                        <p style={{ color: "#555", marginBottom: "1rem" }}>{producto.description}</p>
                        <p
                            style={{
                                fontSize: "1.8rem",
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                            }}
                        >
                            ${producto.price.toLocaleString()}
                        </p>
                        <p
                            style={{
                                color: producto.stock > 0 ? "green" : "red",
                                fontWeight: "bold",
                            }}
                        >
                            {producto.stock > 0 ? "En stock" : "Sin stock"}
                        </p>
                    </div>

                    {/* Botón y Contador */}
                    {producto.stock > 0 && (
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            {/* Contador */}
                            <input
                                id="cantidad"
                                type="number"
                                min="1"
                                max={producto.stock}
                                defaultValue="1"
                                style={{
                                    width: "60px",
                                    padding: "0.5rem",
                                    fontSize: "1rem",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",
                                }}
                            />

                            {/* Botón */}
                            <button
                                onClick={() =>
                                    handleAgregarCarrito(
                                        producto,
                                        parseInt(document.getElementById("cantidad").value)
                                    )
                                }
                                style={{
                                    padding: "0.75rem 1.5rem",
                                    backgroundColor: "#3483fa",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "6px",
                                    fontSize: "1rem",
                                    cursor: "pointer",
                                    width: "180px",
                                    alignSelf: "flex-start",
                                }}
                            >
                                Agregar al carrito
                            </button>
                        </div>
                    )}

                    {/* Si no hay stock, mostrar botón deshabilitado */}
                    {producto.stock <= 0 && (
                        <button
                            disabled
                            style={{
                                padding: "0.75rem 1.5rem",
                                backgroundColor: "#ccc",
                                color: "#fff",
                                border: "none",
                                borderRadius: "6px",
                                fontSize: "1rem",
                                cursor: "not-allowed",
                                width: "180px",
                                alignSelf: "flex-start",
                            }}
                        >
                            Sin stock
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductoDetalle;