import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { environment } from '../../environment';

const baseUrl = environment.baseUrl;

const EditProduct = ({ producto, onProductUpdated, onCancel }) => {
    const [productoEditado, setProductoEditado] = useState(producto);
    const [imagen, setImagen] = useState(null); 

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

    const handleImageChange = (e) => {
        setImagen(e.target.files[0]); 
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('nombre', productoEditado.nombre || ''); 
            formData.append('precio', productoEditado.precio || 0);

          
            const ingredientesArray = typeof productoEditado.ingredientes === 'string'
                ? productoEditado.ingredientes.split(',').map((item) => item.trim())
                : productoEditado.ingredientes;

            formData.append('ingredientes', JSON.stringify(ingredientesArray)); 
            formData.append('categoria', productoEditado.categoria || '');
            formData.append('descripcion', productoEditado.descripcion || '');

            if (imagen) {
                formData.append('imagen', imagen);
            } else {
                formData.append('imagen', productoEditado.imagen || ''); 
            }

            const response = await axios.put(`${baseUrl}/admin-edit-product/${producto.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onProductUpdated(response.data);
        } catch (error) {
            console.error('Error al actualizar el producto:', error.response?.data || error.message);
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
                type="file" 
                name="imagen" 
                accept="image/*" 
                onChange={handleImageChange} 
                style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
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