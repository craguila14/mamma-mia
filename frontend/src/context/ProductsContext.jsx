import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 

    const getAllProducts = async () => {
        setLoading(true); 
        setError(null); 
        try {
            const response = await axios.get('http://localhost:3000/productos'); 
            setProducts(response.data); 
        } catch (error) {
            console.error('Error al obtener productos:', error);
            setError('Error al obtener productos. Inténtalo de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    };

  
    const getProductsByCategory = async (categoria) => {
        setLoading(true); 
        setError(null); 
        try {
            const url = `http://localhost:3000/productos/categoria/${categoria}`; 
            const response = await axios.get(url);
            setProducts(response.data); 
        } catch (error) {
            console.error('Error al obtener productos:', error);
            setError('Error al obtener productos. Inténtalo de nuevo más tarde.');
        } finally {
            setLoading(false); 
        }
    };

    const upperCase = (text) => text.toUpperCase();

   
    const formatIngredients = (ingredients) => {
        if (!ingredients || ingredients.length === 0) {
            return 'No hay ingredientes disponibles';
        }
        return ingredients.map((ingredient) => `🍕 ${upperCase(ingredient)}`).join(', ');
    };

    useEffect(() => {
        getAllProducts(); 
    }, []);

    return (
        <ProductsContext.Provider
            value={{
                products,
                getAllProducts,
                getProductsByCategory,
                loading,
                error,
                upperCase,
                formatIngredients, 
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsProvider;
