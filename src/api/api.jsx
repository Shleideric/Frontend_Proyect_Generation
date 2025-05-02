//Acá inicializamos axios
import axios from "axios";

//Creamos la instancia con la configuración de nuestra ruta base
const api = axios.create({
    //Acepta atributos como ruta base para las peticiones
    baseURL: "https://ecomarket-518098501049.us-central1.run.app",
    //Configuramos metadatos para la cabecera de las peticiones que lleva el tipo de contenido
    // baseURL: "http://localhost:8080",

    
    headers: {
        "Content-Type": "application/json"
    }
});

//Exportamos nuestra instancia de axios
export default api;