import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProduct = ({ producto, onProductUpdated, onCancel }) => {
    const [productoEditado, setProductoEditado] = useState(producto);

    useEffect(() => {
        setProductoEditado(producto);
    }, [producto]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductoEditado((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/admin-edit-product/${producto.id}`, productoEditado);
            onProductUpdated(response.data); 
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
        }
    };

    return (
        <form onSubmit={handleUpdate} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>Editar Producto</h3>
            <input 
                type="text" 
                name="nombre" 
                placeholder="Nombre" 
                value={productoEditado.nombre} 
                onChange={handleChange} 
                required 
                style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
            />
            <input 
                type="number" 
                name="precio" 
                placeholder="Precio" 
                value={productoEditado.precio} 
                onChange={handleChange} 
                required 
                style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
            />
            <input 
                type="text" 
                name="imagen" 
                placeholder="URL de la imagen" 
                value={productoEditado.imagen} 
                onChange={handleChange} 
                required 
                style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
            />
            <input 
                type="text" 
                name="ingredientes" 
                placeholder="Ingredientes" 
                value={productoEditado.ingredientes} 
                onChange={handleChange} 
                required 
                style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
            />
            <input 
                type="text" 
                name="categoria" 
                placeholder="Categoría" 
                value={productoEditado.categoria} 
                onChange={handleChange} 
                required 
                style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
            />
            <textarea 
                name="descripcion" 
                placeholder="Descripción" 
                value={productoEditado.descripcion} 
                onChange={handleChange} 
                required 
                style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
            />
            <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
                Actualizar Producto
            </button>
            <button 
                type="button" 
                onClick={onCancel} 
                style={{ padding: '0.5rem 1rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', marginLeft: '1rem' }}
            >
                Cancelar
            </button>
        </form>
    );
};

export default EditProduct;