const fs = require('fs');
const path = require('path');

module.exports = {
  createUserFolder: (userId) => {
    const folderPath = path.join(__dirname, '..', 'bots', userId);
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
    return folderPath;
  }
};