const readFileHelper = require('../helpers/readFileHelper');

const verifyTalker = async (req, res, next) => {
  try {
    const data = await readFileHelper();
    const { id } = req.params;
    const talker = data.find((t) => t.id === Number(id));
    if (!talker) throw new Error('Pessoa palestrante não encontrada');
    return next();
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = verifyTalker;