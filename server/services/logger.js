const winston = require('winston');

const Logger = new winston.Logger({
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

const infoLogger = function (req, res, next) {
  Logger.info(`[${req.method}] - ${req.url} - ${req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip} - ${req.headers['user-agent']} - ${new Date().toString()}`);
  next();
};

const warnLogger = function (req, res, next) {
  Logger.warn({
    method: req.method,
    url: req.url,
    ip: req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip,
    ips: req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'] : req.ips,
    statusCode: res.statusCode,
    userAgent: req.headers['user-agent']
  });
  next();
};

const errorLogger = function (req, res, next) {
  Logger.error({
    method: req.method,
    url: req.url,
    ip: req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip,
    ips: req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'] : req.ips,
    statusCode: res.statusCode,
    headers: req.headers
  });
  next();
};

export {
  infoLogger,
  warnLogger,
  errorLogger
};
