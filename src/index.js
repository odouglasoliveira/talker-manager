const express = require('express');
const readFileHelper = require('./helpers/readFileHelper');
const verifyTalker = require('./middlewares/verifyTalker');

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

app.listen(PORT, () => {
  console.log('Online');
});
