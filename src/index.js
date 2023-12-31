const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const readFileHelper = require('./helpers/readFileHelper');
const { 
  verifyAge,
  verifyEmail,
  verifyName,
  verifyPwd,
  verifyRate,
  verifyTalk,
  verifyTalker,
  verifyToken,
  verifyWatchedAt } = require('./middlewares');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', verifyToken, async (req, res) => {
  const { q } = req.query;
  const data = await readFileHelper();
  const newData = data.filter((d) => d.name.includes(q));
  return res.status(200).json(newData);
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

app.delete('/talker/:id', verifyToken, verifyTalker, async (req, res) => {
  const { id } = req.params;
  const data = await readFileHelper();
  const newData = data.filter((t) => t.id !== Number(id));
  const jsonData = JSON.stringify(newData);
  fs.writeFileSync('src/talker.json', jsonData, 'utf-8');
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log('Online');
});
