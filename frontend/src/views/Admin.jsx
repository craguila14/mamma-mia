import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import AddProduct from '../components/AddProduct';
import EditProduct from '../components/EditProduct';
import DeleteProduct from '../components/DeleteProduct';
import { environment } from '../environment';

const baseURL = environment.baseUrl;

const Admin = () => {
    const editSectionRef = useRef(null);
    const [productos, setProductos] = useState([]);
    const [editandoProducto, setEditandoProducto] = useState(null);
    const [mostrarAgregar, setMostrarAgregar] = useState(false);
    

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get(`${baseURL}/productos`);
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };

        fetchProductos();
    }, []);

    const scrollToEdit = () => {
        if (editSectionRef.current) {
            editSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleEditClick = (producto) => {
        setEditandoProducto(producto); 
        scrollToEdit();
    };

    const handleProductAdded = (nuevoProducto) => {
        setProductos((prev) => [...prev, nuevoProducto]);
        setMostrarAgregar(false);
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

    const getImageSrc = (image) => {
        return image.startsWith('http') ? image : `http://localhost:3000/${image}`;
    };

    return (
        <div style={{ padding: '2rem', marginTop: '56px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Administrar Productos</h1>

            <div style={{ marginBottom: '2rem', marginTop: '56px'}}>
                <h2>Lista de Productos</h2>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Ingredientes</th>
                            <th>Imagen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.nombre}</td>
                                <td>${producto.precio}</td>
                                <td>{producto.ingredientes ? producto.ingredientes.join(', ') : 'N/A'}</td>
                                <td>
                                    <img 
                                        src={getImageSrc(producto.imagen)} 
                                        alt={producto.nombre}
                                        style={{ width: '50px', height: '50px', objectFit: 'cover'}}
                                    />
                                </td>
                                <td>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => handleEditClick(producto)}
                                        style={{ marginRight: '0.5rem' }}
                                    >
                                        Editar
                                    </Button>
                                    <DeleteProduct productoId={producto.id} onProductDeleted={handleProductDeleted} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Button
                    variant="success"
                    onClick={() => setMostrarAgregar(!mostrarAgregar)}
                    style={{ padding: '0.5rem 1rem', borderRadius: '4px' }}
                >
                    {mostrarAgregar ? 'Ocultar Formulario' : 'Agregar Producto'}
                </Button>
            </div>
            {mostrarAgregar && (
                <div style={{ marginBottom: '2rem' }}>
                    <AddProduct onProductAdded={handleProductAdded} />
                </div>
            )}

            {editandoProducto && (
                <div ref={editSectionRef} style={{ marginBottom: '2rem' }}>
                    <EditProduct
                        producto={editandoProducto}
                        onProductUpdated={handleProductUpdated}
                        onCancel={() => setEditandoProducto(null)}
                    />
                </div>
            )}

        </div>
    );
};

export default Admin;