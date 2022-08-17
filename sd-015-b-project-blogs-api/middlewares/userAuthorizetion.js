module.exports = (req, res, next) => {
  try {
    const { id } = req.user;
    const paramsId = Number(req.params.id);
    
    if (paramsId !== id) {
      return res.status(401).json({ message: 'Unauthorized user' });
    } 
    
  return next();
} catch (error) {
  next(error);
}
};
