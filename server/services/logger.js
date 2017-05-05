const winston = require('winston');

const Options = {
  colorize: true
};

let logger = new winston.Logger({
  transports: [
    new (winston.transports.Console)(Options)
  ]
});

module.exports = logger;
