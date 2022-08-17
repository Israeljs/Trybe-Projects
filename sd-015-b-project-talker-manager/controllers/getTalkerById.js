const fs = require('fs/promises');

const ALL_PERSSONS = './talker.json';

module.exports = async (req, res, next) => {
try {
  const { id } = req.params;

  const data = await fs.readFile(ALL_PERSSONS);
  const parsedData = JSON.parse(data);
  const onePersson = parsedData.find((r) => r.id === Number(id));

  if (!onePersson) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  
  return res.status(200).json(onePersson);
} catch (error) {
  next(error);
}
};
