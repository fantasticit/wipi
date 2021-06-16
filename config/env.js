const fs = require('fs-extra');
const path = require('path');
const dotenv = require('dotenv');
const isProd = process.env.NODE_ENV === 'production';

function parseEnv() {
  const localenv = path.resolve(__dirname, '../.env');
  const prodenv = path.resolve(__dirname, '../.env.prod');

  if (!fs.existsSync(localenv) && !fs.existsSync(prodenv)) {
    throw new Error(`Can not locate any .env file in ${__dirname}`);
  }

  const file = isProd && fs.existsSync(prodenv) ? prodenv : localenv;
  const config = dotenv.parse(fs.readFileSync(file));

  return { file, config };
}

module.exports = parseEnv();
