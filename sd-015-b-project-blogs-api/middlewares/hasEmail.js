module.exports = (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: '"email" is required' });

    return next();
  } catch (error) {
    next(error);
  }
};