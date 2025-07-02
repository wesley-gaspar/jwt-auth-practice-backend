const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = 5000;
const SECRET = 'seuSegredoJWT';

app.use(cors());
app.use(express.json());

// Usuário fake
const user = {
  username: 'admin',
  password: '1234'
};

// Rota de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === user.username && password === user.password) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Credenciais inválidas' });
});

// Rota protegida
app.get('/protected', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: 'Token ausente' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    res.json({ message: `Bem-vindo, ${decoded.username}!` });
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));