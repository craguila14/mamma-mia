import {adminModel} from '../models/adminModel.js'
import 'dotenv/config'

const addProduct = async (req, res) => {
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

const sendEmail = async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  const transporter = adminModel.createTransporter();

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_RECEIVER,
    subject: `Nuevo mensaje de ${nombre}`,
    text: mensaje,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Correo enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).json({ message: 'Error al enviar correo' });
  }
};

const verifyAndSendEmail = async (req, res) => {
  const { email } = req.body;

  const emailExists = await adminModel.isEmailInDatabase(email);
  if (!emailExists) {
    return res.status(404).json({ message: 'El correo no tiene una cuenta asociada' });
  }

  const transporter = adminModel.createTransporter();
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Recuperación de contraseña',
    text: 'Nuestro equipo de soporte se contactará contigo.',
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Correo enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).json({ message: 'Error al enviar correo' });
  }
};


export const adminController = {
    addProduct,
    editProduct,
    deleteProduct,
    sendEmail,
    verifyAndSendEmail
}

