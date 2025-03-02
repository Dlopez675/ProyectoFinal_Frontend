import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from './components/Footer/Footer';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import { PizzaProvider } from './Context/PizzaContext';
import Tienda from './Pages/Tienda/Tienda';
import Pizza from './Pages/Pizza/Pizza';
import PrivateRoute from './Context/PrivateRoute';
import { UserProvider } from './Context/UserContext';
import Perfil from './Pages/Perfil/Perfil';
import Admin from './Pages/Admin/Admin';
import Cart from './Pages/Cart/Cart'; // Importa el componente Cart
import { CartProvider } from './Context/CartContext'; // Importa el CartProvider
import FormularioCompra from './Pages/FormularioCompra/FormularioCompra'; // Importa el componente FormularioCompra
import MisCompras from './Pages/Miscompras/MisCompras'; // Importa el componente MisCompras
import Favoritos from './Pages/Favoritos/Favoritos';
import { PedidosProvider } from './Context/PedidosContext'; // Importa el PedidosProvider
import { FavoritesProvider } from './Context/FavoritosContext'; // Importa el FavoritesProvider

function App() {
  return (
    <div className="app-container"> {/* Contenedor principal */}
      <UserProvider>
        <PizzaProvider>
          <CartProvider> {/* Envuelve todo con CartProvider */}
            <PedidosProvider> {/* Envuelve todo con PedidosProvider */}
              <FavoritesProvider> {/* Envuelve todo con FavoritesProvider */}
                <Navbar />
                <div className="main-content"> {/* Contenedor del contenido principal */}
                  <Routes>
                    {/* Rutas públicas */}
                    <Route path="/" element={<Home />} />
                    <Route path="/Registro" element={<Register />} />
                    <Route path="/Login" element={<Login />} />

                    {/* Rutas privadas */}
                    <Route element={<PrivateRoute />}>
                      <Route path="/Tienda" element={<Tienda />} />
                      <Route path="/pizza/:id" element={<Pizza />} />
                      <Route path="/Perfil" element={<Perfil />} />
                      <Route path="/Admin" element={<Admin />} />
                      <Route path="/Cart" element={<Cart />} />
                      <Route path="/formulario-compra/:order_id" element={<FormularioCompra />} /> {/* Ruta para el formulario de compra */}
                      <Route path="/Favoritos" element={<Favoritos />} /> {/* Ruta para la página de favoritos */}
                      <Route path="/MisCompras" element={<MisCompras />} /> {/* Ruta para la página de mis compras */}
                    </Route>
                  </Routes>
                </div>
                <Footer /> {/* Footer fuera del contenido principal */}
              </FavoritesProvider>
            </PedidosProvider>
          </CartProvider>
        </PizzaProvider>
      </UserProvider>
    </div>
  );
}

export default App;