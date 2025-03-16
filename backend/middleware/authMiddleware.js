import jwt from "jsonwebtoken";
import 'dotenv/config';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token no válido' });
        }

        req.user = user; // Guardar la información del usuario decodificado en la solicitud
        next(); // Continuar con la siguiente función en la ruta
    });
};

export const middleware = {
    authenticateToken,
}