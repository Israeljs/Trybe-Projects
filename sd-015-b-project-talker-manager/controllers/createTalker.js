const { readFile, writeFile } = require('fs/promises');

const ALL_TALKERS = './talker.json';

module.exports = async (req, res, next) => {
  try {
    const { name, age, talk } = req.body;
    const { watchedAt, rate } = talk;

    const talkers = await readFile(ALL_TALKERS); 
    const parsedTalkers = JSON.parse(talkers);
    const newId = await ([...parsedTalkers].pop().id) + 1;

    const newTalker = { id: newId, name, age, talk: { rate, watchedAt } }; 
    parsedTalkers.push(newTalker);

    const stringifiedTalkers = JSON.stringify(parsedTalkers, null, 2);
    await writeFile(ALL_TALKERS, stringifiedTalkers);

    return res.status(201).json(newTalker);
  } catch (error) {
    return next(error);
  }
};
