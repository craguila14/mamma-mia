import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/ShoppingCartContext';
import { ProductsContext } from '../context/ProductsContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ShoppingCart = () => {
    const { cart, addToCart, removeItem, calculateTotal } = useContext(CartContext);
    const { products, upperCase } = useContext(ProductsContext);
    const { currentUser } = useAuth(); 
    const navigate = useNavigate();
    const [warning, setWarning] = useState(''); 

    const getProductInfo = (productId) => {
        return products.find(product => product.id === productId);
    };
      
    const formatPrice = (precio) => {
        return precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            setWarning('El carrito está vacío. Agrega productos antes de proceder al pago.');
            return;
        }

        if (!currentUser) {
            navigate('/login');
        } else {
            navigate('/confirmacion');
        }
    };

    console.log("Contenido del carrito:", cart);


    return (
        <div style={{margin: "5rem"}}>

        <h3>Detalles del pedido:</h3>
        <br></br>
            {cart.map(item => {
                const productInfo = getProductInfo(item.id);
                return (
                    <div 
                        key={item.id} 
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid gray', marginBottom: "2rem"}}>
                    <div 
                        style={{display:"flex", margin: "1rem"}}>
                            <img 
                                src={productInfo.imagen} 
                                alt={productInfo.nombre} 
                                style={{ marginRight: '10px', width: '100px' }} />
                            <p>{upperCase(productInfo.nombre)}</p>
                    </div>
                        
                            
                            <div>
                                <span><b>${formatPrice(productInfo.precio * item.quantity)}</b></span>
                                <button 
                                    onClick={() => addToCart(item.id, productInfo.precio)}
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
