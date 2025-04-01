import React from 'react';
import axios from 'axios';

const DeleteProduct = ({ productoId, onProductDeleted }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/admin-delete-product/${productoId}`);
            onProductDeleted(productoId);
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    return (
        <button
            onClick={handleDelete}
            style={{ padding: '0.5rem 1rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
        >
            Eliminar Producto
        </button>
    );
};

export default DeleteProduct;