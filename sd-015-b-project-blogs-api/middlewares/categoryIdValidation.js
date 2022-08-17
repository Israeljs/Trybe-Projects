const { Category } = require('../models');

module.exports = async (req, res, next) => {
  try {
  const { categoryIds } = req.body;
  const categoriesDB = await Category.findAll();
  const categoriesDBId = categoriesDB.map((cat) => cat.dataValues.id);
  
  const isIqual = categoryIds.every((categoryId) => {
    const result = categoriesDBId.includes(categoryId);
    return result;
  });

  if (!isIqual) return res.status(400).json({ message: '"categoryIds" not found' });
    
return next();
} catch (error) {
  next(error);
}
};