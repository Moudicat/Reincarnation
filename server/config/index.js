const pkg = require('../package.json');

module.exports = {
  app: {
    appName: pkg.name,
    version: pkg.version
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
  }
};
