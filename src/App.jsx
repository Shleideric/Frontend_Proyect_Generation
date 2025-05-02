import './App.css'
import Nosotros from './components/Nosotros/Nosotros.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import { ThemeProvider } from './Context/themeContext.jsx';
import Footer from './components/Footer/Footer.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './Context/UserContext';


import Electronica from './pages/Electronica.jsx'
import Ropa from './pages/Ropa.jsx'
import Hogar from './pages/Hogar.jsx'
import Deportes from './pages/Deportes.jsx'
import Juguetes from './pages/Juguetes.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx';
import ProductoDetalle from './pages/ProductoDetalle.jsx';
import Home from './pages/Home.jsx';
import Carrito from './pages/Carrito.jsx';
import Pago from './pages/Pago.jsx';
import Perfil from './pages/Perfil.jsx';


function App() {
  // const handleAgregar = (producto) => {
  //   console.log("Agregado:", producto);
  // };

  return (
    <>
    
    <UserProvider> 
    <ThemeProvider>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ecoMarket/electronica" element={<Electronica />} />
            <Route path="/ecoMarket/ropa" element={<Ropa />} />
            <Route path="/ecoMarket/hogar" element={<Hogar />} />
            <Route path="/ecoMarket/deportes" element={<Deportes />} />
            <Route path="/ecoMarket/juguetes" element={<Juguetes />} />
            <Route path="/ecoMarket/nosotros" element={<Nosotros />} />
            <Route path="/ecoMarket/login" element={<Login />} />
            <Route path="/ecoMarket/register" element={<Register />} />
            <Route path="/ecoMarket/producto/:id" element={<ProductoDetalle />} /> 
            <Route path="/ecoMarket/carrito" element={<Carrito />} />
            <Route path="/ecoMarket/perfil" element={<Perfil />} />
            <Route path="/ecoMarket/pago" element={<Pago />} /> 
            
            
          </Routes>
        </div>
        <Footer />
      </div>
      
      
    </ThemeProvider>
    </UserProvider> 
   
      
    </>
  );
}

export default App;

