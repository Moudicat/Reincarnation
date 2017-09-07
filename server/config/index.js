import * as pkg from '../package.json';
import { resolve } from 'path';

const host = process.env.HOST || 'localhost';
const env = process.env.NODE_ENV || 'development';
const conf = require(resolve(__dirname, `./${env}.json`));

const defaultConf = {
  app: {
    appName: pkg.name,
    version: pkg.version,
    port: 2777
  },
  jwt: {
    secret: 'reincarnation!@#$%^&*'
  },
  db: {
    host: 'localhost',
    port: '27777',
    db: 'reincarnation',
    path: './db'
  },
  gugu: {
    ak: '7c940ee62e5348bf9752fa9c90ed1c61',
    memobirdID: '6828b35bf8befa35',
    useridentifying: '706870',
    frequency: 2
  },
  api: {
    prefix: '/api'
  }
};

export default Object.assign({env, host}, conf, defaultConf);
