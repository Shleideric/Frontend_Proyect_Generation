
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import logo from "../../assets/logo.jpeg"; // Asegúrate de que el logo esté en esta ruta
import { usuarioService } from "../../service/UsuarioService"; // Asegúrate de que la ruta sea correcta
import * as React from "react";


import {
  
  
  Checkbox,
  CssBaseline,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Stack,
  Card as MuiCard,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

const RegisterBanco = () => {

  const navigate = useNavigate();

  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);

  const handleSubmit = (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
  
      const name = data.get("name");
      const email = data.get("email");
      const user_Country = data.get("country");
      const password = data.get("password");
      const confirmPassword = data.get("confirmPassword");
      const birthday = data.get("birthday");  
      const phone_number = data.get("phone_number");
      const rol = data.get("rol");
  
      let hasError = false;
  
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        setEmailError(true);
        hasError = true;
      } else {
        setEmailError(false);
      }
  
      if (!password || password.length < 6) {
        setPasswordError(true);
        hasError = true;
      } else {
        setPasswordError(false);
      }
  
      if (confirmPassword !== password) {
        setConfirmPasswordError(true);
        hasError = true;
      } else {
        setConfirmPasswordError(false);
      }
  
      if (hasError) return;
  
    
  
      console.log("Registrando usuario:", { email, password });
      // Aquí podrías enviar los datos al backend
  
      let datosUsuario = {
          name,
          email,
          roles: [rol],
          password,
          phone_number,
          birthday,
          user_Country,
      };
  
      usuarioService.registerBanco(datosUsuario)
  
        .then((response) => {
          console.log("Usuario registrado:", response.data);
          // Redirigir o mostrar un mensaje de éxito
  
          navigate("/bancoSimple/loginBanco"); // Redirige a la página de inicio de sesión después del registro exitoso
        })
        .catch((error) => {
          console.error("Error al registrar usuario:", error);
          console.log("Error al registrar usuario:", error.response.data);
        });
  
        
  
        console.log("Datos enviados:", {
          name,
          email,
          user_Country,
          password,
          birthday,
          phone_number,
          roles: [rol],
        }); 
    };

  return (
    <>
          <CssBaseline />
          <section
            style={{
              backgroundColor: "white",
              minHeight: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "2rem",
            }}
          >
            <Card variant="outlined">
              <Typography component="h1" variant="h4" textAlign="center">
                Crear cuenta
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
    
                <FormControl >
                  <FormLabel htmlFor="name">Nombre completo</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    name="name"
                    placeholder="Nombre Apellido"
                    error={nameError}
                    helperText={nameError ? "Nombre inválido" : ""}
                  />
                </FormControl>
    
                <FormControl>
                  <FormLabel htmlFor="email">Correo electrónico</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    name="email"
                    placeholder="correo@ejemplo.com"
                    error={emailError}
                    helperText={emailError ? "Correo inválido" : ""}
                  />
                </FormControl>
    
                <FormControl>
                  <FormLabel htmlFor="country">País</FormLabel>
                  <TextField
                    
                    fullWidth
                    id="country"
                    name="country"
                    select
                    SelectProps ={{ native: true }}
                    
                  >
                    <option value="">Selecciona tu país</option>
                    <option value="Chile">Chile</option>
                    
                  </TextField>
            
                </FormControl>
    
                <FormControl>
                  <FormLabel htmlFor="phone">Teléfono</FormLabel>
                  <TextField  
                    fullWidth
                    id="phone_number"
                    name="phone_number"
                    placeholder="+56 9 1234 5678"
                  />
                </FormControl>
    
                <FormControl>
                  <FormLabel htmlFor="birthday">Fecha de nacimiento</FormLabel>
                  <TextField
                    fullWidth
                    id="birthday"
                    name="birthday"
                    type="date"
                    
                    />
                </FormControl>

                <FormControl sx={{ display: "none" }}>
  <FormLabel htmlFor="rol">Rol</FormLabel>
  <TextField
    fullWidth
    id="rol"
    name="rol"
    select
    SelectProps={{ native: true }}
  >
    <option value="BANK">Banco</option>
  </TextField>
</FormControl>
    
                <FormControl>
                  <FormLabel htmlFor="password">Contraseña</FormLabel>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    type="password"
                    id="password"
                    placeholder="••••••"
                    error={passwordError}
                    helperText={
                      passwordError ? "Debe tener al menos 6 caracteres" : ""
                    }
                  />
                </FormControl>
    
                <FormControl>
                  <FormLabel htmlFor="confirmPassword">
                    Confirmar contraseña
                  </FormLabel>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    type="password"
                    id="confirmPassword"
                    placeholder="••••••"
                    error={confirmPasswordError}
                    helperText={
                      confirmPasswordError
                        ? "Las contraseñas no coinciden"
                        : ""
                    }
                  />
                </FormControl>
    
                <FormControlLabel
                  control={<Checkbox color="primary" required />}
                  label="Acepto los términos y condiciones"
                />
                <Button type="submit" fullWidth variant="contained">
                  Registrarse
                </Button>
              </Box>
              <Divider />
              <Typography sx={{ textAlign: "center", mt: 2 }}>
                ¿Ya tienes cuenta?{" "}
                <Link href="/bancoSimple/loginBanco" variant="body2">
                  Inicia sesión aquí
                </Link>
              </Typography>
            </Card>
          </section>
        </>
  );
};

export default RegisterBanco;