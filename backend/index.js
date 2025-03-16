import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import routes from './routes/tiendaRoutes.js'

dotenv.config()

const app = express();

const PORT = process.env.PORT || 3000;


//Cors
app.use(cors());
app.use(express.json())
app.use('/', routes)


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

export default app;