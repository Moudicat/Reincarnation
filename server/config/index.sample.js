import * as pkg from '../package.json';
import { resolve } from 'path';
const r = path => resolve(__dirname, path);

const host = process.env.HOST || 'localhost';
const env = process.env.NODE_ENV || 'development';
const conf = require(r(`./${env}.json`));

const defaultConf = {
  app: {
    appName: pkg.name,
    version: pkg.version,
    port: 6666
  },
  jwt: {
    secret: 'your secret key'
  },
  db: {
    host: 'localhost',
    port: '27088',
    db: 'your db name',
    path: 'path/to/your/db'
  },
  gugu: {
    ak: 'your ak code',
    memobirdID: 'your id',
    useridentifying: 'your uid',
    frequency: 2,
    blacklist: r('../services/guguBlackList')
  },
  api: {
    prefix: '/api'
  },
  bililive: {
    roomids: [98438, 213, 281, 48360]
  },
  wecom: {
    cid: 'cid',
    secret: 'secret',
    aid: 'aid'
  }
};

export default Object.assign({env, host}, conf, defaultConf);
