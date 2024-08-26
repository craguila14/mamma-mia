import React from 'react'
import { useContext, useEffect } from 'react'
import { PizzaContext } from '../context/PizzaContext'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../context/ShoppingCartContext'

const Home = () => {
    const {pizzas, upperCase} = useContext(PizzaContext)
    const {addToCart} = useContext(CartContext)

    const navigate = useNavigate()

    const handleVerMas = (id) => {
        navigate(`/pizza/${id}`)
    }

    

  return (
    <div className='grid-responsive'>
    {pizzas.map(pizza => (
        <div key={pizza.id} className="card" style={{width: "18rem", margin:"1rem"}}>
            <img src={pizza.img} className="card-img-top" alt="pizza"/>
            <div className="card-body">
            <h5 className="card-title">{pizza.name.charAt(0).toUpperCase() + pizza.name.slice(1)}</h5>
            <hr></hr>
            <p className="card-text"><b>Ingredientes:</b></p>
            <ul>
                {
                    pizza?.ingredients.map((ingredient, index) => (

                <li key={index}>🍕 {upperCase(ingredient)}</li>

                ))
                }
            </ul>
            <hr></hr>
            <h5 style={{display: "flex", justifyContent: "center"}}><b>${pizza.price}</b></h5>
            <div style={{margin: "auto"}}>
                <button 
                    style={{margin: "1rem"}}
                    onClick={() => handleVerMas(pizza.id)}
                    className="btn btn-info">Ver Más 👀</button>
                <button 
                    className="btn btn-danger" 
                    onClick={() => addToCart(pizza.id, pizza.price)}>Añadir 🛒
                </button>
            </div>
        </div>
    </div>
    ))}
        
    </div>
  )
}

export default Home