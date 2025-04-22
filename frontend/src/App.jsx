import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductsProvider from "./context/ProductsContext";
import Home from "./views/Home";
import ProductsDetails from "./views/ProductsDetails";
import ShoppingCart from "./views/ShoppingCart";
import ShoppingCartProvider from "./context/ShoppingCartContext";
import Registrarse from "./views/Registrarse";
import Login from "./views/Login";
import Perfil from "./views/Perfil";
import { AuthProvider } from "./context/AuthContext";
import Admin from "./views/Admin";
import Confirmacion from "./views/Confirmacion";
import ProtectedRoute from './components/ProtectedRoute';
import RecoverPassword from "./views/RecoverPassword";
import ReservaUsuario from "./views/ReservaUsuario";
import AdminReservas from "./views/AdminReservas";

const App = () => {

  return (
    <div>
  <AuthProvider>
    <ShoppingCartProvider>
    <ProductsProvider>
      <Navbar/>
       <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/producto/:id" element={<ProductsDetails/>}/>
          <Route path="/carrito" element={<ShoppingCart/>}/>
          <Route path="/registrarse" element={<Registrarse/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/recover-password" element={<RecoverPassword/>}/>

          <Route
            path="/reserva"
            element={
              <ProtectedRoute>
                <ReservaUsuario />
              </ProtectedRoute>
            }
          />
      
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <Admin />
              </ProtectedRoute>
            }
          />
            <Route
            path="/admin-reservas"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminReservas />
              </ProtectedRoute>
            }
          />
          <Route path="/confirmacion" element={<Confirmacion/>}/>
       </Routes>
    </ProductsProvider>
    </ShoppingCartProvider>
    </AuthProvider>

    </div>
  );
};
export default App;
