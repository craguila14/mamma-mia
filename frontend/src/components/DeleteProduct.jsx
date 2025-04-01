import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

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
        <Button
            variant="danger"
            size="sm"
            onClick={() => setEditandoProducto(producto)}
            style={{ marginRight: '0.5rem' }}
        >
        
            Eliminar Producto
        </Button>
    );
};

export default DeleteProduct;