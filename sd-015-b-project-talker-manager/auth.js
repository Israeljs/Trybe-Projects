const auth = (req, res) => {
  if (!req.headers.authorization);
  return res.status(401).send({ message: 't' });
};

module.exports = auth;
