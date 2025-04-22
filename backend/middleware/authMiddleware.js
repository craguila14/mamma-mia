import jwt from "jsonwebtoken";
import 'dotenv/config';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.log('Token no proporcionado');
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Token inválido:', err.message);
            return res.status(403).json({ error: 'Token no válido' });
        }

        console.log('Token válido, usuario:', user);
        req.user = user;
        next(); 
    });
};

export const middleware = {
    authenticateToken,
}