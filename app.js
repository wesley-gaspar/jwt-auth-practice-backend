import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import morgan from 'morgan';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' })); // Em produção, defina o domínio permitido
app.use(express.json());
app.use(morgan('dev'));

app.use("/", authRoutes)

// Rotas
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});