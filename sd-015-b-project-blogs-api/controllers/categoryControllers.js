const categoryServices = require('../services/categoryServices');

module.exports = {
  add: async (req, res, next) => {
    try {
      const category = await categoryServices.add(req.body);

      if (!category) return res.status(400).json({ message: '"name" is required' });

      return res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const categories = await categoryServices.getAll();
      
      return res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  },

};
