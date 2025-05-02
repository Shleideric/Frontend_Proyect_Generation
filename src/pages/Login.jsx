import * as React from "react";
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "../Context/themeContext";
import { usuarioService } from "../service/UsuarioService";
import { useNavigate } from "react-router-dom"; 
import { useUser } from "../Context/UserContext";

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

export default function Login() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { login } = useUser();

  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const name = data.get("username");

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    usuarioService
      .login({ email, password })
      .then((response) => {
        console.log("Respuesta del servidor:", response);

        localStorage.setItem("username", response.username || email);
        if (response.jwt) {
          localStorage.setItem("token", response.jwt);
        }

        //Redirige al home
        login(response);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        // Aquí puedes mostrar un mensaje de error al usuario
      });
  };

  return (
    <>
      <CssBaseline />
      <section
        style={{
          backgroundColor: colors.background,
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <Card variant="outlined">
          <Typography component="h1" variant="h4" textAlign="center">
            Iniciar Sesión
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
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
                  passwordError
                    ? "La contraseña debe tener al menos 6 caracteres"
                    : ""
                }
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Recordarme"
            />
            <Button type="submit" fullWidth variant="contained">
              Iniciar sesión
            </Button>
          </Box>
          <Divider />
          <Typography sx={{ textAlign: "center", mt: 2 }}>
            ¿No tienes cuenta?{" "}
            <Link href="/ecoMarket/register" variant="body2">
              Regístrate aquí
            </Link>
          </Typography>
        </Card>
      </section>
    </>
  );
}
