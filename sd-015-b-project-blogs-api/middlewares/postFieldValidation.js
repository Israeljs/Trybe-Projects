module.exports = (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;

    if (!title) return res.status(400).json({ message: '"title" is required' });
    
    if (!content) return res.status(400).json({ message: '"content" is required' });
    
    if (!categoryIds) return res.status(400).json({ message: '"categoryIds" is required' });
    
return next();
} catch (error) {
  next(error);
}
};
