import React, { useState } from 'react'
import { createContext } from 'react'

export const CartContext = createContext(null)

const ShoppingCartProvider = ({children}) => {

    const [cart, setCart] = useState([])

    const addToCart = (id, price) => {
       setCart((currItems) => {
        const isItemsFound = currItems.find((item) => item.id === id)
        if (isItemsFound){
            return currItems.map((item) => {
                if(item.id === id) {
                    return {...item, quantity: item.quantity + 1 } 
                } else {
                    return item
                }
            })
        } else {
            return [...currItems, {id, quantity: 1, price}]
        }
       }) 
    }

    const removeItem = (id) => {
        setCart((currItems) => {
          if (currItems.find((item) => item.id === id)?.quantity === 1) {
            return currItems.filter((item) => item.id !== id);
          } else {
            return currItems.map((item) => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity - 1 };
              } else {
                return item;
              }
            });
          }
        });
      };

      const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    };

    const calculateTotal = () => {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        });
        return formatPrice(total);
    };

  return (
    <CartContext.Provider value={{cart, setCart, addToCart, removeItem, calculateTotal}}>
        {children}
    </CartContext.Provider>
  )
}

export default ShoppingCartProvider