import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ producto, colors }) => (
  <div style={{ 
    backgroundColor: colors.background, 
    padding: "1rem", 
    borderRadius: "8px", 
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    height: "100%"
  }}>
    <div style={{ 
      height: "200px", 
      overflow: "hidden", 
      marginBottom: "1rem", 
      backgroundColor: "#f5f5f5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      {producto.img_Url ? (
        <img 
          src={producto.img_Url} 
          alt={producto.product_name} 
          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
        />
      ) : (
        <span style={{ color: "#999" }}>Sin imagen</span>
      )}
    </div>
    
    <h3 style={{ color: colors.text, margin: "0.5rem 0" }}>
      {producto.product_name || "Producto sin nombre"}
    </h3>
    <p style={{ color: colors.primary, fontWeight: "bold", margin: "0.5rem 0" }}>
      ${producto.price.toLocaleString()}
    </p>
 
    
    <Link
      to={`/ecoMarket/producto/${producto.id}`}
      style={{
        display: "block",
        padding: "0.5rem",
        textAlign: "center",
        background: producto.stock > 0 ? colors.primary : "#ccc",
        color: "white",
        textDecoration: "none",
        fontWeight: "bold",
        borderRadius: "4px",
        pointerEvents: producto.stock > 0 ? "auto" : "none",
        marginTop: "auto"
      }}
    >
      {producto.stock > 0 ? "Ver detalles" : "Sin stock"}
    </Link>
  </div>
);

export default ProductCard;