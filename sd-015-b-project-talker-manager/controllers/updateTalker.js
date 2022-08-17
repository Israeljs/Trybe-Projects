const { readFile, writeFile } = require('fs/promises');

const ALL_TALKERS = './talker.json';

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = await readFile(ALL_TALKERS); 
    const parsedTalkers = JSON.parse(talkers);
    const talkerIndex = parsedTalkers.findIndex((t) => t.id === Number(id));
    
    parsedTalkers[talkerIndex] = { ...parsedTalkers[talkerIndex], name, age, talk };

    const stringifiedTalkers = JSON.stringify(parsedTalkers, null, 2);

    await writeFile(ALL_TALKERS, stringifiedTalkers);

    return res.status(200).json(parsedTalkers[talkerIndex]);
  } catch (e) {
    return next(e);
  } 
};
// const updatedtalker = { id: (talkerIndex + 1), name, age, talk };
