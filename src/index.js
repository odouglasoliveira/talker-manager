const express = require('express');
const crypto = require('crypto');
const readFileHelper = require('./helpers/readFileHelper');
const verifyTalker = require('./middlewares/verifyTalker');
const verifyEmail = require('./middlewares/verifyEmail');
const verifyPwd = require('./middlewares/verifyPwd');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const data = await readFileHelper();
  res.status(200).json(data);
});

app.get('/talker/:id', verifyTalker, async (req, res) => {
  const data = await readFileHelper();
  const { id } = req.params;
  const talker = data.find((t) => t.id === Number(id));
  res.status(200).json(talker);
});

app.post('/login', verifyEmail, verifyPwd, async (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
