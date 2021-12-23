const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const os = require('os');


const init = () => {
  const envPath = os.homedir();
  const basePath = envPath + '/.env';
  const currentPath = path.join(__dirname) + '/.env';

  fs.copyFile(basePath, currentPath, (err) => {
    if (err) throw err;
    console.log('source.txt was copied to destination.txt');
  });
  
};

init();

