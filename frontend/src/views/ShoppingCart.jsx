import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/ShoppingCartContext';
import { PizzaContext } from '../context/PizzaContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ShoppingCart = () => {
    const { cart, addToCart, removeItem, calculateTotal } = useContext(CartContext);
    const { pizzas, upperCase } = useContext(PizzaContext);
    const { currentUser } = useAuth(); 
    const navigate = useNavigate();
    const [warning, setWarning] = useState(''); // Estado para el mensaje de advertencia

    const getPizzaInfo = (pizzaId) => {
        return pizzas.find(pizza => pizza.id === pizzaId);
    };
      
    const formatPrice = (precio) => {
        return precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            // Mostrar advertencia si el carrito está vacío
            setWarning('El carrito está vacío. Agrega productos antes de proceder al pago.');
            return;
        }

        if (!currentUser) {
            // Si el usuario no ha iniciado sesión, redirigir a la página de inicio de sesión
            navigate('/login');
        } else {
            // Si el usuario ha iniciado sesión, redirigir a la página de confirmación
            navigate('/confirmacion');
        }
    };

    console.log("Contenido del carrito:", cart);


    return (
        <div style={{margin: "5rem"}}>

        <h3>Detalles del pedido:</h3>
        <br></br>
            {cart.map(item => {
                const pizzaInfo = getPizzaInfo(item.id);
                return (
                    <div 
                        key={item.id} 
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid gray', marginBottom: "2rem"}}>
                    <div 
                        style={{display:"flex", margin: "1rem"}}>
                            <img 
                                src={pizzaInfo.imagen} 
                                alt={pizzaInfo.nombre} 
                                style={{ marginRight: '10px', width: '100px' }} />
                            <p>{upperCase(pizzaInfo.nombre)}</p>
                    </div>
                        
                            
                            <div>
                                <span><b>${formatPrice(pizzaInfo.precio * item.quantity)}</b></span>
                                <button 
                                    onClick={() => addToCart(item.id, pizzaInfo.precio)}
                                    className="btn btn-info m-2">
                                    +
                                </button>
                                <span><b>{item.quantity}</b></span>
                                <button 
                                    onClick={() => removeItem(item.id)}
                                    className="btn btn-danger m-2">
                                    -
                                </button>
                            </div>
                    </div>
                
                );
            })}
            <h2>Total: $ {calculateTotal()}</h2>
            <button className='btn btn-success' onClick={handleCheckout}>
                Ir a pagar
            </button>
            {/* Mostrar advertencia si el carrito está vacío */}
            {warning && <span style={{ color: 'red', marginLeft: '10px' }}>{warning}</span>}
        </div>
    );
}

export default ShoppingCart;
