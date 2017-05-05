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
  }
};
