import React, { useContext, useEffect } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/ShoppingCartContext';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { products, getProductsByCategory, upperCase, loading, error } = useContext(ProductsContext);
    const { addToCart } = useContext(CartContext);
    const { currentUser } = useAuth();
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

    const getImageSrc = (image) => {
        return image.startsWith('http') ? image : `http://localhost:3000/${image}`;
    };

    const handleReservaClick = () => {
        if (currentUser) {
            navigate('/reserva');
        } else {
            navigate('/login');
        }
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
                            onClick={() => handleCategoryClick('pasta')}
                        >
                            Pastas
                        </button>
                    </li>
                    <li>
                        <button
                            style={{ width: '100%' }}
                            className="btn btn-primary"
                            onClick={() => handleCategoryClick('postre')}
                        >
                            Postres
                        </button>
                    </li>
                </ul>
                <div
                    style={{
                        marginTop: '2rem',
                        padding: '1rem',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        textAlign: 'center',
                        backgroundColor: 'white'
                    }}
                >
                    <h5>¡Visítanos!</h5>
                    <p>Reserva tu mesa y disfruta de una experiencia única.</p>
                    <button
                        className="btn btn-success"
                        onClick={handleReservaClick}
                    >
                        Haz tu reserva aquí
                    </button>
                </div>
        </div>

            <div style={{ width: '80%', padding: '1rem', marginLeft: '20%' }}>
                {loading && <p>Cargando productos...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="grid-responsive">
                    {products.map((product) => (
                        <div key={product.id} className="card" style={{ width: '18rem', margin: '1rem' }}>
                            <img src={getImageSrc(product.imagen)} className="card-img-top" alt={product.nombre} />
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
