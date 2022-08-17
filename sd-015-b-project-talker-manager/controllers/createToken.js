const { randomBytes } = require('crypto');

module.exports = (req, res, next) => {
  try {
    const token = randomBytes(8).toString('hex');
    
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
