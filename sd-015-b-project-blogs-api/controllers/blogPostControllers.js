const blogPostServices = require('../services/blogPostServices');

module.exports = {
  add: async (req, res, next) => {
    try {
      const { title, content, categoryIds } = req.body;
      const { id } = req.user;

      const blogPost = await blogPostServices.add(title, content, id, categoryIds);

      return res.status(201).json(blogPost);
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const blogPosts = await blogPostServices.getAll();

      return res.status(200).json(blogPosts);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const blogPost = await blogPostServices.getById(id);

      if (!blogPost) return res.status(404).json({ message: 'Post does not exist' });

      return res.status(200).json(blogPost);
    } catch (error) {
      next(error);
    }
  },

  updatePost: async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const { id } = req.user;

      const isUpdated = await blogPostServices.updatePost(id, title, content);

      if (isUpdated === 1) {
        const postUpdated = await blogPostServices.getToUpdate(id);
        return res.status(200).json(postUpdated);
      }

      return next();
    } catch (error) {
      next(error);
    }
  },

  remove: async (req, res, next) => {
    try {
      const { id } = req.params;
      const isDeleted = await blogPostServices.remove(id);

      if (isDeleted === 1) return res.status(204).send();

      return next();
    } catch (error) {
      next(error);
    }
  },

  search: async (req, res, next) => {
    try {
      const { q } = req.query;

      const post = await blogPostServices.search(q);

      return res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  },

};
