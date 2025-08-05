import bcrypt from 'bcrypt';

const passwordHash = bcrypt.hashSync('1234', 10);

export const users = [
  {
    username: 'admin',
    password: passwordHash
  }
];