//Este componente se va a encargar de definir cómo se va a llamar a cada recurso o endpoints para Producto
import api from '../api/api'

export const productoService = {
    //Este objeto que vamos a exportar como servicio define todos los métodos
    //Método para obtener la lista de productos
    getAll: async () => {
        try {
            const response = await api.get("/products/list");
            return response.data;
        } catch (error) {
            console.log("Hubo un error al obtener los productos", error);
            throw error;
        }
    },

    getByCategory: async (categoria) => {
    //Hacemos uso del mismo método para obtener todos los productos y hacemos filtrado por acá
        try {
            const response = await api.get("/products/list");
            console.log("Datos recibidos del backend ", response.data);
            //Usamos función filter para buscar por categoría
            const productosFiltrados = response.data.filter(
                
                (producto) =>
                    producto.product_Categories && producto.product_Categories.some((cat) => cat.nombre === categoria) 
            )
            console.log("Productos filtrados por categoría ", productosFiltrados);
            return productosFiltrados;
        }
        catch (error) {
            console.log("hubo un error al obtener los productos por categoría ", error);
            throw error;
        }
    }

}