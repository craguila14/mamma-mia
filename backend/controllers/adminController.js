import {adminModel} from '../models/adminModel.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const addProduct = async (req, res) => {
    try {
        const { nombre, precio, ingredientes, categoria, descripcion } = req.body;
        const imagen = req.file ? `uploads/${req.file.filename}` : null;

        console.log('Datos recibidos en el backend:', { nombre, precio, ingredientes, categoria, descripcion, imagen });

        if (!nombre || !precio || !ingredientes || !categoria || !descripcion || !imagen) {
            console.log('Faltan campos obligatorios:', { nombre, precio, ingredientes, categoria, descripcion, imagen });
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }
        
        if (isNaN(precio) || precio <= 0) {
            return res.status(400).json({ message: 'El precio debe ser un número válido mayor a 0.' });
        }

        const ingredientesArray = Array.isArray(ingredientes) ? ingredientes : JSON.parse(ingredientes);

        const newProduct = await adminModel.addProduct({ nombre, precio, ingredientes: ingredientesArray, categoria, descripcion, imagen });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error al agregar producto:', error.message);
        res.status(500).json({ message: 'Error del servidor.' });
    }
};

const editProduct = async (req, res) => {
    const { nombre, precio, ingredientes, categoria, descripcion } = req.body;
    const { id } = req.params;
    const imagen = req.file ? `uploads/${req.file.filename}` : req.body.imagen;

    try {
        console.log('Datos recibidos en el backend:', { nombre, precio, ingredientes, categoria, descripcion, imagen });

        if (!nombre || !precio || !ingredientes || !categoria || !descripcion || !imagen) {
            console.log('Faltan campos obligatorios:', { nombre, precio, ingredientes, categoria, descripcion, imagen });
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        const ingredientesArray = Array.isArray(ingredientes)
            ? ingredientes
            : typeof ingredientes === 'string'
            ? JSON.parse(ingredientes)
            : [];

        const updatedProduct = await adminModel.editProduct(id, nombre, precio, imagen, ingredientesArray, categoria, descripcion);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error al editar producto:', error.message);
        res.status(500).json({ error: 'Error al editar producto' });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        console.log('ID recibido para eliminar producto:', id);

        const deletedProduct = await adminModel.deleteProduct(id);
        if (deletedProduct) {
            res.status(200).json(deletedProduct);  
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });  
        }
    } catch (error) {
        console.error('Error al eliminar producto:', error.message);
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
};

export const adminController = {
    addProduct,
    editProduct,
    deleteProduct
}

