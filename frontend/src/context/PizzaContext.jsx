import React, {createContext, useState, useEffect} from 'react'

export const PizzaContext = createContext()

const PizzaProvider = ({children}) => {

    const [pizzas, setPizzas] = useState([]);

    const getPizzas = async () => {
      const response = await fetch("/pizzas.json");
      const data = await response.json();
      setPizzas(data);
    };
  
    useEffect(() => {
      getPizzas();
    }, []);

    const upperCase = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

  return (
    <PizzaContext.Provider value={{pizzas, upperCase}}>
        {children}
    </PizzaContext.Provider>
  )
}

export default PizzaProvider