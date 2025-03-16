import React, { useContext } from 'react';
import { CartContext } from '../context/ShoppingCartContext';
import { PizzaContext } from '../context/PizzaContext';

const PizzaDetails = ({ pizza }) => {
  const { addToCart } = useContext(CartContext);
  const { upperCase } = useContext(PizzaContext);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <div className="pizza-details">
      <h2>{upperCase(pizza.name)}</h2>
      <p>{pizza.description}</p>
      <p>Precio: {formatPrice(pizza.price)}</p>
      <button onClick={() => addToCart(pizza.id, pizza.price)}>Añadir al carrito</button>
    </div>
  );
};

export default PizzaDetails;
