import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { environment } from '../../environment';

const baseUrl = environment.baseUrl;

const DeleteProduct = ({ productoId, onProductDeleted }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`${baseUrl}/admin-delete-product/${productoId}`);
            onProductDeleted(productoId);
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    return (
        <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            style={{ marginRight: '0.5rem' }}
        >
            Eliminar Producto
        </Button>
    );
};

export default DeleteProduct;