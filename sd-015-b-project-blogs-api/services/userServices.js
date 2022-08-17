const { User } = require('../models');

module.exports = {
  add: async (body) => {
    try {
    const { displayName, email, password, image } = body;

    const isDuplicate = await User.findOne({ where: { email } });

    if (isDuplicate) return null;
    const user = await User.create({ displayName, email, password, image });
    
    return user;  
    } catch (error) {
      return error.message;
    }
  },

  getAll: async () => {
    try {
      const users = await User.findAll();

      return users;
    } catch (error) {
      return error.message;
    }
  },

  getById: async (id) => {
    try {
      const user = await User.findByPk(id);

      return user;
    } catch (error) {
      return error.message;
    }
  },

  remove: async (id) => {
    try {
      let result = 0;
      const user = await User.findByPk(id);

      if (user) {
        result = await user.destroy();
      }
      console.log(result);

      return result;
    } catch (error) {
      return error.message;
    }
  },
};
