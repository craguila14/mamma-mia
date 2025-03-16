import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PizzaContext = createContext();

const PizzaProvider = ({ children }) => {
    const [pizzas, setPizzas] = useState([]);

    const getPizzas = async () => {
        try {
            const response = await axios.get('http://localhost:3000/productos');
            setPizzas(response.data);
            console.log(response.data); 
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    useEffect(() => {
        getPizzas();
    }, []);

    // Función para convertir la primera letra a mayúscula de una cadena
    const upperCase = (string) => {
        if (typeof string === 'string') {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        return string; 
    };

    
    const formatIngredients = (ingredients) => {
        if (Array.isArray(ingredients)) {
            return ingredients.map(ingredient => upperCase(ingredient));
        }
        return ingredients;
    };

    return (
        <PizzaContext.Provider value={{ pizzas, upperCase, formatIngredients }}>
            {children}
        </PizzaContext.Provider>
    );
};

export default PizzaProvider;
