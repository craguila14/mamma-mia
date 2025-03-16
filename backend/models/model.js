import pool from '../config/db.js'
import format from 'pg-format';

const createUser = async (nombre, apellido, email, password) => {
    try {
        const result = await pool.query(
            'INSERT INTO usuarios (nombre, apellido, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, apellido, email, password]
        );
        if (result.rowCount > 0) {
            return result.rows[0];
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error al crear usuario:', error.message);
        throw error;
    }
};

const getUserByEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (result.rowCount > 0) {
            return result.rows[0];
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error al obtener usuario por email:', error.message);
        throw error; 

    }
};

const actualizarPerfil = async (usuario_id, datosActualizados) => {
  try {
    const { nombre, apellido, email } = datosActualizados;
  
    const result = await pool.query(
      'UPDATE usuarios SET nombre = $1, apellido = $2, email = $3 WHERE id = $4 RETURNING *',
      [nombre, apellido, email, usuario_id]
    );

    if (result.rowCount > 0) {
      return { success: true, usuario: result.rows[0] };
    } else {
      return { success: false, message: 'No se pudo actualizar el perfil o el usuario no existe.' };
    }
  } catch (error) {
    console.error('Error al actualizar perfil:', error.message);
    throw error;
  }
};


export const model = {
    createUser,
    getUserByEmail,
    actualizarPerfil
}