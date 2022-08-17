module.exports = (req, res, next) => {
try {
  const { email } = req.body;
  const emailValid = /\S+@\S+\.\S+/;
  const isEmail = emailValid.test(email);

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  if (!isEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  return next();
} catch (error) {
  next(error);
}
};
