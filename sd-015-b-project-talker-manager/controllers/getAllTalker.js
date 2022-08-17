const { readFile } = require('fs/promises');

const ALL_PERSSONS = './talker.json';

module.exports = async (_req, res) => {
  try {
    const data = await readFile(ALL_PERSSONS);
    const parsedData = JSON.parse(data);
    return res.status(200).json(parsedData);
  } catch (error) {
    return error;
  }
};
