import React, { useState } from "react";
import { Box, Typography, Button, Link } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import logoBanco from "../../assets/logoBanco.png"; // Asegúrate de que el logo esté en esta ruta

const BancoSimple = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f5f5dc" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: "20%",
          backgroundColor: "#4caf50",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2rem 1rem",
        }}
      >
        {/* Top Buttons */}
        {!isLoggedIn && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
            <Button
              variant="contained"
              startIcon={<PersonIcon />}
              sx={{
                backgroundColor: "#ffffff",
                color: "#000000",
                justifyContent: "flex-start",
                textTransform: "none",
                "&:hover": { backgroundColor: "#e0e0e0" },
                width: "100%",
              }}
              onClick={() => (window.location.href = "/bancoSimple/loginBanco")}
            >
              Inicio de sesión
            </Button>
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              sx={{
                backgroundColor: "#f5f5dc",
                color: "#000000",
                justifyContent: "flex-start",
                textTransform: "none",
                "&:hover": { backgroundColor: "#e0e0e0" },
                width: "100%",
              }}
            >
              Inicio
            </Button>
          </Box>
        )}

        {/* Footer Links */}
        <Box sx={{ textAlign: "center", width: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "space-around", marginBottom: "1rem" }}>
            <Link href="#" underline="hover" sx={{ color: "#000000", fontWeight: "bold" }}>
              Nosotros
            </Link>
            <Link href="#" underline="hover" sx={{ color: "#000000", fontWeight: "bold" }}>
              Contacto
            </Link>
          </Box>
          <Typography variant="body2" sx={{ color: "#000000" }}>
            © 2025 BancoSimple
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5dc",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Bienvenido a BancoSimple
        </Typography>
        <img
          src={logoBanco}
          alt="Logo BancoSimple"
          style={{ width: "400px" }}
        />
      </Box>
    </Box>
  );
};

export default BancoSimple;