module.exports = (req, res, next) => {
  try {
    const regex = /\S+@\S+\.\S+/; 
    const { email } = req.body;
    const isEmail = regex.test(email);
    
    if (!isEmail) return res.status(400).json({ message: '"email" must be a valid email' });

    return next();
  } catch (error) {
    next(error);
  }
};
