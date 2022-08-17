const blogPostServices = require('../services/blogPostServices');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params; // Number(req.params);

    const isPost = await blogPostServices.getById(id);
    
    if (!isPost) return res.status(404).json({ message: 'Post does not exist' });

    return next();
  } catch (error) {
    next(error);
  }
};
