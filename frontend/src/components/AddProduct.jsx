import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ onProductAdded }) => {
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        precio: '',
        ingredientes: '',
        categoria: 'pizza',
        descripcion: '',
    });

    const [imagen, setImagen] = useState(null); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoProducto((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setImagen(e.target.files[0]); 
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        
        try {
            const formData = new FormData();
            formData.append('nombre', nuevoProducto.nombre);
            formData.append('precio', nuevoProducto.precio);
            
            const ingredientesArray = nuevoProducto.ingredientes.split(',').map((item) => item.trim());
            formData.append('ingredientes', JSON.stringify(ingredientesArray));
            
            formData.append('categoria', nuevoProducto.categoria);
            formData.append('descripcion', nuevoProducto.descripcion);
            
            if (imagen) {
                formData.append('imagen', imagen);
            }

            const response = await axios.post('http://localhost:3000/admin-add-product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            onProductAdded(response.data);
            setNuevoProducto({ nombre: '', precio: '', ingredientes: '', categoria: 'pizza', descripcion: '' });
            setImagen(null);
            
        } catch (error) {
            console.error('Error al agregar el producto:', error);
        }
    };

    return (
        <form onSubmit={handleAdd} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>Agregar Producto</h3>
            <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={nuevoProducto.nombre}
                onChange={handleChange}
                required
                style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
            />
            <input
                type="number"
                name="precio"
                placeholder="Precio"
                value={nuevoProducto.precio}
                onChange={handleChange}
                required
                style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
            />
            <input
                type="text"
                name="ingredientes"
                placeholder="Ingredientes"
                value={nuevoProducto.ingredientes}
                onChange={handleChange}
                required
                style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
            />
            <select
                name="categoria"
                value={nuevoProducto.categoria}
                onChange={handleChange}
                required
                style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
            >
                <option value="pizza">Pizza</option>
                <option value="pastas">Pasta</option>
                <option value="postres">Postre</option>
            </select>
            <textarea
                name="descripcion"
                placeholder="Descripción"
                value={nuevoProducto.descripcion}
                onChange={handleChange}
                required
                style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
            />
            <input
                type="file"
                name="imagen"
                accept="image/*"
                onChange={handleImageChange}
                required
                style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
            />
            <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
                Agregar Producto
            </button>
        </form>
    );
};

export default AddProduct;