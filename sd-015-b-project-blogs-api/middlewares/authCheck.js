const verifyToken = require('../utils/verifyToken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  
  const userData = verifyToken(authorization);

  if (!userData) return res.status(401).json({ message: 'Expired or invalid token' });
  
  req.user = userData; // criando uma nova chave no objeo req e passando os dados do usuário.
  next();
};
