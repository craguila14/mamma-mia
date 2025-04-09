import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/tiendaRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Agrega este middleware para procesar FormData

// Configura la carpeta 'uploads' como un recurso estático
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

export default app;