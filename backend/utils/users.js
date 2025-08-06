import bcrypt from 'bcrypt';

const passwordHash = bcrypt.hashSync('1234', 10);
const passwordHash2 = bcrypt.hashSync('1010', 10);
console.log(passwordHash)

export const users = [
  {
    username: 'admin',
    password: passwordHash
  },
  {
    username: 'teste',
    password: passwordHash2
  }
];