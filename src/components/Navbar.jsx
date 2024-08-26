import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { CartContext } from '../context/ShoppingCartContext'

const Navbar = () => {
  const {calculateTotal} = useContext(CartContext)
  return (
    <div>
        <nav className="navbar navbar-light bg-info">
            <div className="container-fluid">
                <NavLink style={{color: "white"}} className="navbar-brand" to="/">🍕 Pizzería Mamma Mia! </NavLink>
                <NavLink style={{color: "white"}} className="navbar-brand" to="/carrito"><span>Total: $ {calculateTotal()}</span> 🛒 </NavLink>
            </div>
        </nav>            
    </div>
  )
}

export default Navbar