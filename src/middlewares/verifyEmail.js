async function verifyEmail(req, res, next) {
  const { email } = req.body;
  const HTTP_ERROR_STATUS = 400;
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const isInvalid = !emailRegex.test(email);
  if (!email) {
    return res
    .status(HTTP_ERROR_STATUS)
    .json({ message: 'O campo "email" é obrigatório' });
  }
  if (isInvalid) {
    return res
    .status(HTTP_ERROR_STATUS)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
}

module.exports = verifyEmail;