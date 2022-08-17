const { User } = require('../models');

const createToken = require('../utils/createToken');

module.exports = {
  login: async (email, password) => {
    try {
      const user = await User.findOne({ where: { email } });
      
      if (!user || user.password !== password) return null;
  
      const token = createToken(user);
  
      return token;
    } catch (error) {
      return error;
    }
  },
};
