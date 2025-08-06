import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { users } from '../utils/users.js';
import { authenticateToken } from '../middleware/authenticateToken.js';
import { API_SECRET } from '../config/index.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body

  if (!username, !password){
    return res.status(400).json({ message: 'Usuário e senha são obrigatórios' })
  }

  const existingUser = users.find(u => u.username === username)
  if (existingUser) {
    return res.status(409).json({ message: 'Nome de usuário já existente' })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    users.push({ username, password: hashedPassword })
    
    return res.status(201).json({ message: 'Usuário registrado com sucesso'})
  } catch(err) {
    return res.status(500).json({ message: 'Erro ao registrar o usuário'})
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
  }

  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const token = jwt.sign({ username: user.username }, API_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Bem-vindo, ${req.user.username}!` });
});

export default router;