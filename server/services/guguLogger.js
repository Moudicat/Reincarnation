/**
 * Created by Moudicat on 2017/7/9.
 */
const winston = require('winston');

module.exports = new winston.Logger({
  transports: [
    new (winston.transports.File) ({
      name: 'warn-file',
      filename: './logs/gugu-info.log',
      level: 'info'
    })
  ]
});
