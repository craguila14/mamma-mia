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


export const adminController = {
    addProduct
}

