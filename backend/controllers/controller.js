import bcrypt from 'bcryptjs'
import {model} from '../models/model.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const registerUser = async (req, res) => {
    const { nombre, apellido, email, password} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await model.createUser(nombre, apellido, email, hashedPassword);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await model.getUserByEmail(email);
        console.log("Usuario encontrado:", user);

        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", passwordMatch);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta : ' + password });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(token)

        res.json({ token });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ error: 'Error en el login', details: error.message });
    }
};

const getUser = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await model.getUserByEmail(decoded.email);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
};

const updateUserProfile = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { nombre, apellido, email } = req.body;

        const updatedUser = await model.actualizarPerfil(decoded.id, { nombre, apellido, email });

        if (updatedUser.success) {
            res.json(updatedUser.usuario);
        } else {
            res.status(400).json({ error: updatedUser.message });
        }
    } catch (error) {
        console.error("Error al actualizar perfil:", error);
        res.status(500).json({ error: 'Error al actualizar perfil', details: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await model.getProducts();
        res.json(products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos', details: error.message });
    }
};

export const controller = {
    registerUser,
    loginUser,
    getUser,
    updateUserProfile,
    getProducts
}