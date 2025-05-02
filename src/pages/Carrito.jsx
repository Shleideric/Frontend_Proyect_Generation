import React, { use } from "react";
import { useCart } from "../Context/CardProvider";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Button,
  IconButton,
  TextField,    
  Link
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";


const Carrito = () => {
  const { carrito, limpiarCarrito, agregarAlCarrito, eliminarDelCarrito } = useCart();
  const navigate = useNavigate();

  const handleEliminarProducto = (productoId) => {
    eliminarDelCarrito(productoId); // Llama a la función para eliminar el producto del carrito
  };

  const handleReducirCantidad = (producto) => {
    if (producto.cantidad > 1) {
      agregarAlCarrito(producto, -1); // Reducir la cantidad en 1
    } else {
      console.log(`No se puede reducir más la cantidad del producto: ${producto.product_name}`);
    }
  };

  const handleAumentarCantidad = (producto) => {
    agregarAlCarrito(producto, 1); // Aumentar la cantidad en 1
  };

  const handleActualizarCantidad = (producto, nuevaCantidad) => {
    const cantidad = parseInt(nuevaCantidad, 10);
    if (!isNaN(cantidad) && cantidad > 0) {
      const diferencia = cantidad - producto.cantidad;
      agregarAlCarrito(producto, diferencia);
    }
  };

  // Calcular el precio total
  const precioTotal = carrito.reduce(
    (total, producto) => total + producto.price * producto.cantidad,
    0
  );

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Tu Carrito
      </Typography>

      {carrito.length === 0 ? (
        <Typography variant="body1">Tu carrito está vacío.</Typography>
      ) : (
        <>
          <List>
            {carrito.map((producto) => (
              <React.Fragment key={producto.id}>
                <ListItem>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    {/* Botón cuadrado para eliminar producto */}
                    <IconButton
                      onClick={() => handleEliminarProducto(producto.id)}
                      sx={{
                        backgroundColor: "red",
                        color: "white",
                        "&:hover": { backgroundColor: "darkred" },
                        width: "40px",
                        height: "40px",
                        borderRadius: "4px", // Hace que el botón sea cuadrado
                      }}
                    >
                      <CloseIcon />
                    </IconButton>

                    {/* Imagen y nombre del producto */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <ListItemAvatar>
                        <Avatar
                          src={producto.img_Url}
                          alt={producto.product_name}
                          sx={{ width: 70, height: 70 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={producto.product_name}
                        secondary={`Precio unitario: $${producto.price.toLocaleString()}`}
                      />
                    </Box>

                    {/* Input y botones para cantidad */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleReducirCantidad(producto)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <TextField
                        type="number"
                        value={producto.cantidad}
                        onChange={(e) => handleActualizarCantidad(producto, e.target.value)}
                        inputProps={{
                          min: 1,
                          style: { textAlign: "center", width: "50px" },
                        }}
                        size="small"
                      />
                      <IconButton
                        size="small"
                        sx={{ color: "green" }}
                        onClick={() => handleAumentarCantidad(producto)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>

                    {/* Total por producto */}
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Total: ${(
                        producto.price * producto.cantidad
                      ).toLocaleString()}
                    </Typography>
                  </Box>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>

          {/* Botones de acción */}
          <Box
            sx={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={limpiarCarrito}
              sx={{ width: "200px" }}
            >
              Vaciar Carrito
            </Button>
            <Link to="/ecoMarket/pago">
            <Button
              variant="contained"
              sx={{ backgroundColor: "green", color: "white", width: "200px" }}
              onClick={() => navigate("/ecoMarket/pago")}
            >
              Ir a pagar
            </Button>
            </Link>
            
          </Box>
        </>
      )}
    </Box>
  );
};

export default Carrito;