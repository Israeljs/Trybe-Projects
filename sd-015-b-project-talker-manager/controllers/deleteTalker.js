const { readFile, writeFile } = require('fs/promises');

const ALL_TALKERS = './talker.json';

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;

    const talkers = await readFile(ALL_TALKERS); 
    const parsedTalkers = JSON.parse(talkers);

    const talkerIndex = parsedTalkers.findIndex((t) => t.id === Number(id));
    parsedTalkers.splice(talkerIndex, 1);

    const stringifiedTalkers = JSON.stringify(parsedTalkers, null, 2);

    await writeFile(ALL_TALKERS, stringifiedTalkers);

    return res.status(204).end();
  } catch (error) {
    return next(error);
  } 
};
