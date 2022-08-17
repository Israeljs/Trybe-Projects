module.exports = (req, res, next) => {
  try {
    const { password } = req.body;

    if (password.length !== 6) {
      return res.status(400).json(
        { message: '"password" length must be 6 characters long' },
        ); 
    }

return next();
} catch (error) {
  next(error);
}
};
