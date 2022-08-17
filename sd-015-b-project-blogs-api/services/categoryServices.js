const { Category } = require('../models');

module.exports = {
  add: async (body) => {
    try {
    const { name } = body;

    if (!name) return null;
    const category = await Category.create({ name });
    
    return category;  
    } catch (error) {
      return error.message;
    }
  },

  getAll: async () => {
    const category = await Category.findAll();

    return category;
  },
};
