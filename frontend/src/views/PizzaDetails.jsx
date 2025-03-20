import React, { useContext, useEffect, useState } from 'react'
import { PizzaContext } from '../context/PizzaContext'
import { useParams } from 'react-router-dom'
import { CartContext } from '../context/ShoppingCartContext'

const PizzaDetails = () => {
    const { pizzas, upperCase } = useContext(PizzaContext)
    const { id } = useParams()
    const [pizza, setPizza] = useState(null)
    const {addToCart} = useContext(CartContext)

    useEffect(() => {
        const foundPizza = pizzas.find(pizza => pizza.id === id)
        setPizza(foundPizza)
    }, [pizzas, id])

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    };

    if (!pizza) {
        return <div>Cargando...</div>
    }

    return (
        <div key={pizza.id} style={{margin: "2rem", display: "flex"}}>
            <div style={{marginRight: "1rem"}}>
                <img src={pizza.imagen} alt={pizza.nombre}/>
            </div>
            <div>
                <h2>{upperCase(pizza.nombre)}</h2>
                <hr></hr>
                <p>{pizza.descripcion}</p>
                <p className="card-text"><b>Ingredientes:</b></p>
                <ul>
                    {pizza.ingredientes.map((ingredient, index) => (
                        <li key={index}>🍕 {upperCase(ingredient)}</li>
                    ))}
                </ul>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                <h4>Precio: ${formatPrice(pizza.precio)}</h4>
                <button className="btn btn-danger" onClick={() => addToCart(pizza.id, pizza.precio)}>Añadir 🛒</button>
                </div>
            </div>
        </div>
    )
}

export default PizzaDetails

