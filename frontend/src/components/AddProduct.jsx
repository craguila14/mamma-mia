import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ onProductAdded }) => {
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        precio: '',
        imagen: '',
        ingredientes: '',
        categoria: 'pizza',
        descripcion: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoProducto((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/admin-add-product', nuevoProducto);
            onProductAdded(response.data);
            setNuevoProducto({ nombre: '', precio: '', imagen: '', ingredientes: '', categoria: 'pizza', descripcion: '' });
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
                name="imagen"
                placeholder="URL de la imagen"
                value={nuevoProducto.imagen}
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
                <option value="pasta">Pasta</option>
                <option value="postre">Postre</option>
            </select>
            <textarea
                name="descripcion"
                placeholder="Descripción"
                value={nuevoProducto.descripcion}
                onChange={handleChange}
                required
                style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
            />
            <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
                Agregar Producto
            </button>
        </form>
    );
};

export default AddProduct;