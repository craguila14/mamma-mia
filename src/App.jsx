import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PizzaProvider from "./context/PizzaContext";
import Home from "./views/Home";
import PizzaDetails from "./views/PizzaDetails";
import ShoppingCart from "./views/ShoppingCart";
import ShoppingCartProvider from "./context/ShoppingCartContext";


const App = () => {

  return (
    <div>
    <ShoppingCartProvider>
    <PizzaProvider>
      <Navbar/>
       <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/pizza/:id" element={<PizzaDetails/>}/>
          <Route path="/carrito" element={<ShoppingCart/>}/>
       </Routes>
    </PizzaProvider>
    </ShoppingCartProvider>

    </div>
  );
};
export default App;
