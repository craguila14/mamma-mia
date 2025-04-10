import React, { useState } from 'react'
import { createContext } from 'react'

export const CartContext = createContext(null)

const ShoppingCartProvider = ({children}) => {

    const [cart, setCart] = useState([])

    const addToCart = (id, precio) => {
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
            return [...currItems, {id, quantity: 1, precio}]
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

      const formatPrice = (precio) => {
        return precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    };

    const calculateTotal = () => {
        let total = 0;
        cart.forEach(item => {
            total += item.precio * item.quantity;
        });
        return formatPrice(total);
    };

    const clearCart = () => {
      setCart([]); 
  };

  return (
    <CartContext.Provider value={{cart, setCart, addToCart, removeItem, calculateTotal, clearCart}}>
        {children}
    </CartContext.Provider>
  )
}

export default ShoppingCartProvider