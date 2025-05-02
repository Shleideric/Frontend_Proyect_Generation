import { usuarioService } from "../../service/UsuarioService";
import React, { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext"; // Asegúrate de que la ruta sea correcta

const Home = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { usuario } = useUser();

    useEffect(() => {
        // Simula obtener el token y los datos del usuario
        const token = usuario.token; // Reemplaza con el token real
        const datosUsuario = { email: "usuario@ejemplo.com" }; // Reemplaza con los datos reales

        usuarioService.userEmail(datosUsuario, token)
            .then((data) => {
                setUserData(data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        // <div>
        //     <h1>User Data</h1>
        //     {loading ? (
        //         <p>Loading...</p>
        //     ) : userData ? (
        //         <pre>{JSON.stringify(userData, null, 2)}</pre>
        //     ) : (
        //         <p>No user data available.</p>
        //     )}
        // </div>
        <div style={{
                backgroundColor: "white", // Fondo según el modo
                color: "black", // Texto según el modo
                minHeight: "68.7vh"
              }}
            className="perfil-container">
              
              <div className="perfil-datos">
                <h1>Perfil del Usuario</h1>
                <p><strong>Nombre:</strong> {usuario.username}</p>
                <p><strong>Correo:</strong> {usuario.email}</p>
                {/* Aquí puedes agregar más información del usuario según sea necesario */}
              </div>
            </div>
    );
};

export default Home;