import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/ShoppingCartContext';
import { PizzaContext } from '../context/PizzaContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ShoppingCart = () => {
    const { cart, addToCart, removeItem, calculateTotal } = useContext(CartContext);
    const { pizzas, upperCase } = useContext(PizzaContext);
    const { currentUser } = useAuth(); 
    const navigate = useNavigate();

    const getPizzaInfo = (pizzaId) => {
        return pizzas.find(pizza => pizza.id === pizzaId);
    };
      
    const formatPrice = (precio) => {
        return precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    };

    const handleCheckout = () => {
        if (!currentUser) {
            navigate('/login');
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
        </div>
    );
}

export default ShoppingCart;
