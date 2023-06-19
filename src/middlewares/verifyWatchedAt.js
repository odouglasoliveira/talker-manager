const verifyWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  const isDateInvalid = !dateRegex.test(watchedAt);
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' }); 
  }
  if (isDateInvalid) { 
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = verifyWatchedAt;