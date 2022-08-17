module.exports = (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password) return res.status(400).json({ message: '"password" is required' });
    
return next();
} catch (error) {
  next(error);
}
};
