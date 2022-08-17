const userServices = require('../services/userServices');

module.exports = {
  add: async (req, res, next) => {
    try {
      const user = await userServices.add(req.body);

      if (!user) return res.status(409).json({ message: 'User already registered' });

      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const users = await userServices.getAll();
      
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;  
      const user = await userServices.getById(id);
  
      if (!user) return res.status(404).json({ message: 'User does not exist' });

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  remove: async (req, res, next) => {
    try {
      const { id } = req.user;
      const isDeleted = await userServices.remove(id);

      if (isDeleted !== 0) return res.status(204).send();

      return next();
    } catch (error) {
      next(error);
    }
  },
};
