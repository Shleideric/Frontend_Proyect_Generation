//Simulación de cómo recibiremos los productos del backend
import React, { useEffect, useState } from "react";
import { useTheme } from "../../Context/themeContext";//Hook personalizado, que utiliza el contexto de modo oscuro
import { Link } from "react-router-dom";
import ProductCard from "./ProductoCard";
import { productoService } from "../../service/ProductoService";
import Juguetes from "../../pages/Juguetes";
import { categoriaService } from "../../service/CategoriaService";


export default function GridProducto({ categoria }) {
    //Usamos los colores del tema oscuro
    const { colors } = useTheme();
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [categorias, setCategorias] = useState([]);



    //Este objeto permitirá indicar la categoría de productos
    //const categorias = { electronica: "ELECTRONICA", ropa: "ROPA", hogar: "HOGAR", deportes: "DEPORTES", Juguetes: "JUGUETES" };
    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const data = await categoriaService.getAll();
    //             const categorias1 = data.map((cat) => cat.nombre);
                
    //             setCategorias(categorias1);
    //             console.log("Categorías", categorias1);
    //         } catch (error) {
    //             setError(error);
    //             console.log(error);
    //         }
    //     };
    //     fetchCategories();
    // }, []);

    // //Usamos el useEffect para llamar a axios y al método get()
    // useEffect(() => {
    //     const fetchProducts = async() => {
    //         try {
    //             //Verificamos que traiga una categoría al momento de buscar con axios
    //             console.log("Categoría recibida del backend ", categoria);
    //             console.log("Categorías disponibles ", categorias);
    //             setCargando(true);
    //             if(!categorias.includes(categoria)) 
                    
    //                 throw new Error('Categoría inválida')
    //                 const data = await productoService.getByCategory(categoria);
    //                 setProductos(data);
    //         } catch (error) {
    //             setError(error);
    //             console.log(error);
    //         } finally {
    //             setCargando(false);
    //         }
    //     };
    //     fetchProducts();
    // }, [categoria]);


    useEffect(() => {
        const fetchData = async() => {
            try {
                setCargando(true);
                let data;
                if (categoria) {
                    data = await productoService.getByCategory(categoria);
                } else {
                    data = await productoService.getAll();
                }

                setProductos(data);

            } catch (error) {
                setError(error);
                console.log(error);
            } finally {
                setCargando(false);
            }
        };
        fetchData();
    }, [categoria]);

    //Mensaje de carga cuando cambiemos de categoría
    if(cargando) 
        return (<div style={{textAlign:'center', padding:'2rem' }}>Cargando...</div>)

    
    return (
        <>
        <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
        gap: "2rem" 
      }}>
        {productos.map((producto) => (
          <ProductCard key={producto.id} producto={producto} colors={colors} />
        ))}
      </div>
        </>
    )

}