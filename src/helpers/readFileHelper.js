const fs = require('fs/promises');

async function readFileHelper() {
  const data = JSON.parse(await fs.readFile('src/talker.json', 'utf-8'));
  return data;
}

module.exports = readFileHelper;