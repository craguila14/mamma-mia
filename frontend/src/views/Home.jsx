import React from 'react';
import { useContext, useEffect } from 'react';
import { PizzaContext } from '../context/PizzaContext';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/ShoppingCartContext';

const Home = () => {
    const { pizzas, upperCase } = useContext(PizzaContext);
    const { addToCart } = useContext(CartContext);

    const navigate = useNavigate();

    const handleVerMas = (id) => {
        navigate(`/pizza/${id}`);
    };

    const formatPrice = (price) => {
        return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '0';
    };

    return (
        <div className='grid-responsive'>
            {pizzas.map(pizza => (
                <div key={pizza.id} className="card" style={{ width: "18rem", margin: "1rem" }}>
                    <img src={pizza.imagen} className="card-img-top" alt="pizza" />
                    <div className="card-body">
                        <h5 className="card-title">{upperCase(pizza.nombre)}</h5>
                        <hr />
                        <p className="card-text"><b>Ingredientes:</b></p>
                        <ul>
                            {
                                pizza?.ingredientes && pizza.ingredientes.length > 0 ? (
                                    pizza.ingredientes.map((ingredient, index) => (
                                        <li key={index}>🍕 {upperCase(ingredient)}</li>
                                    ))
                                ) : (
                                    <p>No hay ingredientes disponibles</p>
                                )
                            }
                        </ul>
                        <hr />
                        <h5 style={{ display: "flex", justifyContent: "center" }}><b>${formatPrice(pizza.precio)}</b></h5>
                        <div style={{ margin: "auto" }}>
                            <button
                                style={{ margin: "1rem" }}
                                onClick={() => handleVerMas(pizza.id)}
                                className="btn btn-info">Ver Más 👀</button>
                            <button
                                className="btn btn-danger"
                                onClick={() => addToCart(pizza.id, pizza.precio)}>Añadir 🛒
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;
