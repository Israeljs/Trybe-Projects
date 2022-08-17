require('dotenv').config();

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const JWT_CONFIG = {
  expiresIn: '10000m',
  algorithm: 'HS256',
};

module.exports = (user) => {
  const { password: passDb, ...userWithoutPassword } = user.dataValues;// Salvou o password na variável passDb e todo o resto na whithoutPassword
  const token = jwt.sign(userWithoutPassword, JWT_SECRET, JWT_CONFIG);// payload, segredo e configurações
  return token;
};
