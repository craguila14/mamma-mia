import pool from '../config/db.js';
import format from 'pg-format';

const addProduct = async ({ nombre, precio, imagen, ingredientes, categoria, descripcion }) => {
    try {

        const ingredientesPgArray = `{${ingredientes.join(',')}}`;

        const query = 'INSERT INTO productos (nombre, precio, imagen, ingredientes, categoria, descripcion) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const values = [nombre, precio, imagen, ingredientesPgArray, categoria, descripcion];

        const result = await pool.query(query, values);

        if (result.rowCount > 0) {
            return result.rows[0]; 
        } else {
            return false; 
        }
    } catch (error) {
        console.error('Error al agregar producto:', error.message);
        throw error;
    }
};

const editProduct = async (id, nombre, precio, imagen, ingredientes, categoria, descripcion) => {
    try {
        const ingredientesPgArray = Array.isArray(ingredientes) ? `{${ingredientes.join(',')}}` : null;

        const query = 'UPDATE productos SET nombre = $1, precio = $2, imagen = $3, ingredientes = $4, categoria = $5, descripcion = $6 WHERE id = $7 RETURNING *';
        const values = [nombre, precio, imagen, ingredientesPgArray, categoria, descripcion, id];

        const result = await pool.query(query, values);

        if (result.rowCount > 0) {
            return result.rows[0]; 
        } else {
            return false; 
        }
    } catch (error) {
        console.error('Error al editar producto:', error.message);
        throw error;
    }
};

const deleteProduct = async (id) => {
    try {
        const query = 'DELETE FROM productos WHERE id = $1 RETURNING *';
        const values = [id];

        const result = await pool.query(query, values);

        if (result.rowCount > 0) {
            return result.rows[0]; 
        } else {
            return false; 
        }
    } catch (error) {
        console.error('Error al eliminar producto:', error.message);
        throw error;
    }
}


export const adminModel = {
    addProduct,
    editProduct,
    deleteProduct
};
