import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProduct from '../components/AddProduct';
import EditProduct from '../components/EditProduct';
import DeleteProduct from '../components/DeleteProduct';

const Admin = () => {
    const [productos, setProductos] = useState([]);
    const [editandoProducto, setEditandoProducto] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/productos');
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };

        fetchProductos();
    }, []);

    const handleProductAdded = (nuevoProducto) => {
        setProductos((prev) => [...prev, nuevoProducto]);
    };

    const handleProductUpdated = (productoActualizado) => {
        setProductos((prev) =>
            prev.map((producto) => (producto.id === productoActualizado.id ? productoActualizado : producto))
        );
        setEditandoProducto(null);
    };

    const handleProductDeleted = (productoId) => {
        setProductos((prev) => prev.filter((producto) => producto.id !== productoId));
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Administrar Productos</h1>

            {/* Lista de Productos */}
            <div style={{ marginBottom: '2rem' }}>
                <h2>Lista de Productos</h2>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {productos.map((producto) => (
                        <li
                            key={producto.id}
                            style={{
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                padding: '1rem',
                                marginBottom: '1rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div>
                                <h3 style={{ margin: 0 }}>{producto.nombre}</h3>
                                <p style={{ margin: '0.5rem 0' }}>Precio: ${producto.precio}</p>
                                <p style={{ margin: '0.5rem 0' }}>Categoría: {producto.categoria}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => setEditandoProducto(producto)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        marginRight: '0.5rem',
                                    }}
                                >
                                    Editar
                                </button>
                                <DeleteProduct productoId={producto.id} onProductDeleted={handleProductDeleted} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Editar Producto */}
            {editandoProducto && (
                <div style={{ marginBottom: '2rem' }}>
                    <EditProduct
                        producto={editandoProducto}
                        onProductUpdated={handleProductUpdated}
                        onCancel={() => setEditandoProducto(null)}
                    />
                </div>
            )}

            {/* Agregar Producto */}
            <div>
                <AddProduct onProductAdded={handleProductAdded} />
            </div>
        </div>
    );
};

export default Admin;