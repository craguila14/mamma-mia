import React, { useContext, useEffect } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/ShoppingCartContext';

const Home = () => {
    const { products, getProductsByCategory, upperCase, loading, error } = useContext(ProductsContext);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        getProductsByCategory('pizza');
    }, []);

    const handleVerMas = (id) => {
        navigate(`/producto/${id}`);
    };

    const formatPrice = (price) => {
        return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '0';
    };

    const handleCategoryClick = (categoria) => {
        getProductsByCategory(categoria); 
    };

    return (
        <div style={{ display: 'flex', marginTop: '56px' }}>

        <div
            style={{
                width: '20%',
                padding: '1rem',
                backgroundColor: 'white',
                position: 'fixed', 
                height: '100vh', 
                overflowY: 'auto'
            }}>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    <li>
                        <button
                            style={{ width: '100%', marginBottom: '0.5rem' }}
                            className="btn btn-primary"
                            onClick={() => handleCategoryClick('pizza')}
                        >
                            Pizzas
                        </button>
                    </li>
                    <li>
                        <button
                            style={{ width: '100%', marginBottom: '0.5rem' }}
                            className="btn btn-primary"
                            onClick={() => handleCategoryClick('pastas')}
                        >
                            Pastas
                        </button>
                    </li>
                    <li>
                        <button
                            style={{ width: '100%' }}
                            className="btn btn-primary"
                            onClick={() => handleCategoryClick('postres')}
                        >
                            Postres
                        </button>
                    </li>
                </ul>
        </div>

            <div style={{ width: '80%', padding: '1rem', marginLeft: '20%' }}>
                {loading && <p>Cargando productos...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="grid-responsive">
                    {products.map((product) => (
                        <div key={product.id} className="card" style={{ width: '18rem', margin: '1rem' }}>
                            <img src={product.imagen} className="card-img-top" alt={product.nombre} />
                            <div className="card-body">
                                <h5 className="card-title">{upperCase(product.nombre)}</h5>
                                <hr />
                                <p className="card-text">
                                    <b>Ingredientes:</b>
                                </p>
                                <ul>
                                    {product?.ingredientes && product.ingredientes.length > 0 ? (
                                        product.ingredientes.map((ingredient, index) => (
                                            <li key={index}>🍕 {upperCase(ingredient)}</li>
                                        ))
                                    ) : (
                                        <p>No hay ingredientes disponibles</p>
                                    )}
                                </ul>
                                <hr />
                                <h5 style={{ display: 'flex', justifyContent: 'center' }}>
                                    <b>${formatPrice(product.precio)}</b>
                                </h5>
                                <div style={{ margin: 'auto' }}>
                                    <button
                                        style={{ margin: '1rem' }}
                                        onClick={() => handleVerMas(product.id)}
                                        className="btn btn-info"
                                    >
                                        Ver Más 👀
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => addToCart(product.id, product.precio)}
                                    >
                                        Añadir 🛒
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
