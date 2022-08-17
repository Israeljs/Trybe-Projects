const loginServices = require('../services/loginServices');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await loginServices.login(email, password);

      if (!token) return res.status(400).json({ message: 'Invalid fields' });

      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  },
};
