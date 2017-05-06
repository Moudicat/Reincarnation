const winston = require('winston');

module.exports = new winston.Logger({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      level: 'info'
    }),
    new (winston.transports.File) ({
      name: 'warn-file',
      filename: './logs/filelog-warn.log',
      level: 'warn',
      json: true
    }),
    new (winston.transports.File) ({
      name: 'error-file',
      filename: './logs/filelog-error.log',
      level: 'error',
      json: true
    })
  ]
});
