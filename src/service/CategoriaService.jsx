import api from "../api/api";

export const categoriaService = {

    //Método para obtener la lista de categorías
    getAll: async () => {
        try {
            const response = await api.get("/categories/list");
            return response.data;
        } catch (error) {
            console.log("Hubo un error al obtener las categorías", error);
            throw error;
        }
    },

    //Método para obtener una categoría por id
    getById: async (id) => {
        try {
            const response = await api.get(`/categories/categories/${id}`);
            return response.data;
        } catch (error) {
            console.log("Hubo un error al obtener la categoría", error);
            throw error;
        }
    },
}