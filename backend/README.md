# 🔐 API de Autenticação com JWT (Node.js + Express)

Esta é uma API REST construída com **Node.js + Express**, que implementa autenticação via **JWT (JSON Web Token)** com boas práticas de segurança e organização.  
Inclui:

- Middleware de autenticação reutilizável
- Hash seguro de senhas com `bcrypt`
- Logs de requisição HTTP com `morgan`
- Estrutura modular para facilitar manutenção e escalabilidade

---

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [JWT](https://jwt.io/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [dotenv](https://github.com/motdotla/dotenv)
- [cors](https://github.com/expressjs/cors)
- [morgan](https://github.com/expressjs/morgan)

---


## 🚀 Como rodar a aplicação

1. **Clone este repositório:**

    ```bash
    git clone https://github.com/seu-usuario/jwt-auth-app.git
    cd jwt-auth-app
    ```

2. **Crie o arquivo `.env` com a chave JWT:**

    ```env
    API_SECRET=
    ```

3. **Instale as dependências:**

    ```bash
    npm install
    ```

4. **Inicie o servidor:**

    ```bash
    npm start
    ```

> O servidor estará disponível em `http://localhost:5000`

---

## 🔐 Rotas da API

### 1. 📥 Login

- **Método:** `POST`
- **Endpoint:** `/auth/login`
- **Descrição:** Autentica o usuário e retorna um token JWT

### 2. 🔒 Rota Protegida

- **Método:** `GET`
- **Endpoint:** `/auth/protected`
- **Descrição:** Rota protegida que exige autenticação via JWT


## 📋 Logs com morgan
Cada requisição HTTP é logada automaticamente no terminal:

- POST /auth/login 200 14ms
- GET /auth/protected 401 3ms


## ✅ Segurança Aplicada

| Item                          | Descrição                                                                 |
|-------------------------------|---------------------------------------------------------------------------|
| 🔐 Hash de Senhas             | As senhas dos usuários são armazenadas com `bcrypt`, nunca em texto puro. |
| ⏳ Expiração de Token         | Os tokens JWT possuem expiração configurada (`1h`).                        |
| 🧱 Middleware de Autenticação | A verificação do token é feita via middleware reutilizável.               |
| 🔒 Variáveis de Ambiente      | A chave secreta JWT está protegida no `.env`.                             |
| 🌐 CORS Ativado               | Requisições externas são permitidas via `cors` (ajustável).               |
| 📋 Logs HTTP                  | Cada requisição é logada com `morgan` para facilitar rastreamento.        |

---

## 📌 Próximos Passos

- [ ] Criar rota `/auth/register` para cadastro de novos usuários
- [ ] Implementar conexão com banco de dados (MongoDB, PostgreSQL, etc.)
- [ ] Adicionar suporte a **Refresh Tokens** e logout seguro
- [ ] Validar entradas com `express-validator` ou `Joi`
- [ ] Restringir CORS em ambiente de produção
- [ ] Implementar controle de acesso por **papéis** (ex: admin, user)