import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PizzaProvider from "./context/PizzaContext";
import Home from "./views/Home";
import PizzaDetails from "./views/PizzaDetails";
import ShoppingCart from "./views/ShoppingCart";
import ShoppingCartProvider from "./context/ShoppingCartContext";
import Registrarse from "./views/Registrarse";
import Login from "./views/Login";
import Perfil from "./views/Perfil";
import { AuthProvider } from "./context/AuthContext";
import Admin from "./views/Admin";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  return (
    <div>
  <AuthProvider>
    <ShoppingCartProvider>
    <PizzaProvider>
      <Navbar/>
       <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/pizza/:id" element={<PizzaDetails/>}/>
          <Route path="/carrito" element={<ShoppingCart/>}/>
          <Route path="/registrarse" element={<Registrarse/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/perfil" element={<Perfil/>}/>
          <Route path="/admin" element={<Admin/>}/>
       </Routes>
    </PizzaProvider>
    </ShoppingCartProvider>
    </AuthProvider>
    <ToastContainer />

    </div>
  );
};
export default App;
