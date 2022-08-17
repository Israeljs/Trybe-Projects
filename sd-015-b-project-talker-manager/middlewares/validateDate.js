const CONST_MASTER = { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };

module.exports = (req, res, next) => {
  try {
    const { talk } = req.body;
    const correctDate = /^\d{2}[./]\d{2}[./]\d{4}$/;
    const validateDate = correctDate.test(talk.watchedAt);

    if (!talk.watchedAt) {
      return res.status(400)
        .json({ 
          message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
        });
    }
    if (!validateDate) {
      return res.status(400).json(CONST_MASTER);
    }
    return next();
  } catch (error) {
    next(error);
  }
};
