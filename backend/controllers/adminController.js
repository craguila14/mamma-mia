import {adminModel} from '../models/adminModel.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const addProduct = async (req, res) => {
    const { nombre, precio, imagen, ingredientes, categoria, descripcion} = req.body;

    try {
        const newProduct = await adminModel.addProduct(nombre, precio, imagen, ingredientes, categoria, descripcion);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar producto' });
    }
};

const editProduct = async (req, res) => {
    const { nombre, precio, imagen, ingredientes, categoria, descripcion } = req.body;
    const { id } = req.params;

    try {
        const updatedProduct = await adminModel.editProduct(id, nombre, precio, imagen, ingredientes, categoria, descripcion);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al editar producto' });
    }
};

export const adminController = {
    addProduct,
    editProduct
}

