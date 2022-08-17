const { Op } = require('sequelize');

const { BlogPost, User, Category } = require('../models');

module.exports = {
  add: async (title, content, userId, categoryIds) => {
    try {
    const blogPost = await BlogPost.create({ title, content, userId, categoryIds });

    return { id: blogPost.dataValues.id, userId, title, content };  
    } catch (error) {
      return error.message;
    }
  },

  getAll: async () => {
    try {
      const blogPosts = await BlogPost.findAll({
        include: [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
      });
      // 'user' e 'categories' foram os nomes dados nas associações
      return blogPosts;
    } catch (error) {
      return error.message;
    }
  },

  getById: async (id) => {
    try {
      const posts = await BlogPost.findByPk(id);
      
      if (!posts) return null;

      const blogPost = await BlogPost.findOne({
        where: { id },
        include: [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
      });

      return blogPost;
    } catch (error) {
      return error.message;
    }
  },

  updatePost: async (id, title, content) => {
    try {
      const result = await BlogPost.update({ title, content }, {
        where: { id },
      });
      
      return result[0];
    } catch (error) {
      return error.message;
    }
  },

  getToUpdate: async (id) => {
    try {
      const blogPost = await BlogPost.findOne({
        where: { id },
        include: [
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
        attributes: { exclude: ['id', 'published', 'updated'] },
      });

      return blogPost;
    } catch (error) {
      return error.message;
    }
  },

  remove: async (id) => {
    try {
      const result = await BlogPost.destroy({
        where: { id },
      });

      return result;
    } catch (error) {
      return error.message;
    }
  },

  search: async (search) => {
    try {
      if (search) {
        const post = await BlogPost.findAll({
          where: { [Op.or]: [{ title: search }, { content: search }] },
          include: [{ model: User, as: 'user' },
            { model: Category, as: 'categories', through: { attributes: [] } },
          ],
        });
        return post;
      }
      const posts = await BlogPost.findAll({
        include: [{ model: User, as: 'user' },
          { model: Category, as: 'categories', through: { attributes: [] } }],
      });
      return posts;
    } catch (error) {
      return error.message;
    }
  },

};
