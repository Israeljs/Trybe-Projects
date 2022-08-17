const { readFile } = require('fs/promises');

const ALL_TALKERS = './talker.json';

module.exports = async (req, res, next) => {
  try {
    const { q: talker } = req.query;

    const talkers = await readFile(ALL_TALKERS, 'utf-8'); 
    const parsedTalkers = JSON.parse(talkers);

    const filteredTalkers = parsedTalkers.filter(({ name }) => {
      const lowerCasedQuery = talker.toLowerCase();
      const lowerCaseTalker = name.toLowerCase();
      return lowerCaseTalker.includes(lowerCasedQuery);
    });

    return res.status(200).json(filteredTalkers);
  } catch (error) {
    return next(error);
  }
};
