import React from "react";
import GridProducto from "../components/Producto/GridProducto";
import { useTheme } from "../Context/themeContext";

export default function Electronica() {
    const { colors } = useTheme();
    return (
        <>
        <section
        style={{
            backgroundColor: colors.background,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
        }}>
            <div
            style={{
                padding: "2rem",
                flex: 1,
                display: "flex",
                flexDirection: "column",

            }}>
                <h1
                style={{
                    color: colors.primary,
                    textAlign: "center",
                    marginBottom: "2rem",
                }}
                >Los mejores electrodomésticos para cada rincón de tu casa</h1>
                <GridProducto categoria="Electrónica"/>
            </div>
        </section>
            
        </>
    )
}