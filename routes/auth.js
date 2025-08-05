import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { users } from '../utils/users.js';
import { authenticateToken } from '../middleware/authenticateToken.js';
import { API_SECRET } from '../config/index.js';

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(401).json({ message: 'Usuário não encontrado' });
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Senha incorreta' });
  }

  const token = jwt.sign({ username: user.username }, API_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Bem-vindo, ${req.user.username}!` });
});

export default router;