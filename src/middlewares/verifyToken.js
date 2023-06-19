const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  const INVALID_TOKEN_CODE = 401;
  if (!authorization) {
    return res
    .status(INVALID_TOKEN_CODE)
    .json({ message: 'Token não encontrado' });
  }
  if (typeof authorization !== 'string' || authorization.length !== 16) {
    return res
    .status(INVALID_TOKEN_CODE)
    .json({ message: 'Token inválido' });
  }
  next();
};

module.exports = verifyToken;