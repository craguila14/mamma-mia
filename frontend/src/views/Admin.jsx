import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const Admin = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', precio: '', imagen: '', ingredientes: '', categoria: '', descripcion: '' });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({
      ...nuevoProducto,
      [name]: name === 'precio' ? parseFloat(value) || '' : value, // Convertir a número si es el campo precio
    });
  };

  // Agregar un nuevo producto
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      // Convertir ingredientes a un arreglo
      const productoConIngredientes = {
        ...nuevoProducto,
        ingredientes: nuevoProducto.ingredientes.split(',').map((ing) => ing.trim()), // Convertir a arreglo
      };

      const response = await axios.post('http://localhost:3000/admin-add-product', productoConIngredientes);
      setProductos([...productos, response.data]);
      setNuevoProducto({ nombre: '', precio: '', imagen: '', ingredientes: '', categoria: '', descripcion: '' }); // Limpiar el formulario
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      console.log(nuevoProducto);
    }
  };

  // Eliminar un producto
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admin-delete-product/${id}`);
      setProductos(productos.filter((producto) => producto.id !== id));
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  // Editar un producto
  const handleEdit = (producto) => {
    setEditandoProducto(producto);
    setNuevoProducto({ nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen, ingredientes: producto.ingredientes, categoria: producto.categoria, descripcion: producto.descripcion });
  };

  // Actualizar un producto
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/admin-edit-product/${editandoProducto.id}`, nuevoProducto);
      setProductos(
        productos.map((producto) =>
          producto.id === editandoProducto.id ? response.data : producto
        )
      );
      setEditandoProducto(null); // Salir del modo de edición
      setNuevoProducto({ nombre: '', precio: '', imagen: '', ingredientes: '', categoria: '', descripcion: '' }); // Limpiar el formulario
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
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
                <Button
                  variant="warning"
                  onClick={() => handleEdit(producto)}
                  className="me-2"
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(producto.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Form onSubmit={editandoProducto ? handleUpdate : handleAdd} className="mt-4">
        <Form.Group controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={nuevoProducto.nombre}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="precio" className="mt-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name="precio"
            value={nuevoProducto.precio}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="imagen" className="mt-3">
          <Form.Label>Imagen (URL)</Form.Label>
          <Form.Control
            type="text"
            name="imagen"
            value={nuevoProducto.imagen}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="ingredientes" className="mt-3">
          <Form.Label>Ingredientes</Form.Label>
          <Form.Control
            type="text"
            name="ingredientes"
            value={nuevoProducto.ingredientes}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="categoria" className="mt-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            type="text"
            name="categoria"
            value={nuevoProducto.categoria}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="descripcion" className="mt-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="descripcion"
            value={nuevoProducto.descripcion}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          {editandoProducto ? 'Actualizar Producto' : 'Agregar Producto'}
        </Button>
        {editandoProducto && (
          <Button
            variant="secondary"
            className="mt-3 ms-2"
            onClick={() => {
              setEditandoProducto(null);
              setNuevoProducto({ nombre: '', precio: '', imagen: '', ingredientes: '', categoria: '', descripcion: '' });
            }}
          >
            Cancelar
          </Button>
        )}
      </Form>
    </div>
  );
};

export default Admin;