require('dotenv').config();

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = (token) => {
  try {
    const dataUser = jwt.verify(token, JWT_SECRET);
    return dataUser;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
