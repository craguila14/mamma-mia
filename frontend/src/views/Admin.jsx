import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Admin = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Obtener los productos desde el servidor
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

  const handleEdit = (id) => {
    // Lógica para editar el producto
    console.log('Editar producto con ID:', id);
  };

  const handleUpdate = (id) => {
    // Lógica para actualizar el producto
    console.log('Actualizar producto con ID:', id);
  };

  const handleAdd = () => {
    // Lógica para agregar un nuevo producto
    console.log('Agregar nuevo producto');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Administrar Productos</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.precio}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(producto.id)} className="me-2">
                  Editar
                </Button>
                <Button variant="success" onClick={() => handleUpdate(producto.id)}>
                  Actualizar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleAdd} className="mt-3">
        Agregar Producto
      </Button>
    </div>
  );
};

export default Admin;