import pool from '../config/db.js'
import bcrypt from 'bcrypt';

const createUser = async (nombre, apellido, email, password) => {
    try {

      const query = 'INSERT INTO usuarios (nombre, apellido, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
      const values = [nombre, apellido, email, password];
      const result = await pool.query(query, values);
      
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

const getProducts = async () => {
  try {
    const result = await pool.query('SELECT * FROM productos');
    if (result.rowCount > 0) {
      return result.rows;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    throw error;
  }
};

const getProductByCategory = async (categoria) => {
  try {
    const query = 'SELECT * FROM productos WHERE categoria = $1'; 
    const values = [categoria];
    const result = await pool.query(query, values); 

    if (result.rowCount > 0) {
      return result.rows; 
    } else {
      return []; 
    }
  } catch (error) {
    console.error('Error al obtener productos por categoría:', error.message);
    throw error; 
  }
};


const updatePassword = async (id, currentPasswordInput, newPassword) => {
  try {
    
    const query = 'SELECT password FROM usuarios WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      throw new Error('Usuario no encontrado');
    }

    const storedPassword = result.rows[0].password;

    const isPasswordValid = await bcrypt.compare(currentPasswordInput, storedPassword);
    if (!isPasswordValid) {
      throw new Error('La contraseña actual es incorrecta');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updateQuery = 'UPDATE usuarios SET password = $1 WHERE id = $2';
    const updateValues = [hashedPassword, id];
    await pool.query(updateQuery, updateValues);

    return { message: 'Contraseña actualizada correctamente' };
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error.message);
    throw error;
  }
};


export const model = {
    createUser,
    getUserByEmail,
    actualizarPerfil,
    getProducts,
    getProductByCategory,
    updatePassword
}