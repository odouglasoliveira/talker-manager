const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const readFileHelper = require('./helpers/readFileHelper');
const verifyTalker = require('./middlewares/verifyTalker');
const verifyEmail = require('./middlewares/verifyEmail');
const verifyPwd = require('./middlewares/verifyPwd');
const verifyToken = require('./middlewares/verifyToken');
const verifyName = require('./middlewares/verifyName');
const verifyAge = require('./middlewares/verifyAge');
const verifyTalk = require('./middlewares/verifyTalk');
const verifyRate = require('./middlewares/verifyRate');
const verifyWatchedAt = require('./middlewares/verifyWatchedAt');

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

app.post('/talker', verifyToken, verifyName, verifyAge, verifyTalk, verifyWatchedAt, verifyRate,
  async (req, res) => {
  const { name, age, talk } = req.body;
  const data = await readFileHelper();
  const newTalker = {
    name,
    age,
    id: data.length + 1,
    talk,
  };
  data.push(newTalker);
  const jsonData = JSON.stringify(data);
  fs.writeFileSync('src/talker.json', jsonData, 'utf-8');
  res.status(201).json(newTalker);
});

app.put('/talker/:id', verifyTalker, verifyToken, verifyName, verifyAge, verifyTalk,
  verifyWatchedAt,
  verifyRate,
  async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const idNumber = Number(id);
  const data = await readFileHelper();
  const newData = data.filter((t) => t.id !== Number(id));
  const newTalker = {
    name,
    age,
    id: idNumber,
    talk,
  };
  newData.push(newTalker);
  const jsonData = JSON.stringify(newData);
  fs.writeFileSync('src/talker.json', jsonData, 'utf-8');
  res.status(200).json(newTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
