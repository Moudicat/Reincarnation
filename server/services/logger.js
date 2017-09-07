import winston from 'winston';
import { resolve } from 'path';

const r = path => resolve(__dirname, path);

const apiLogger = new winston.Logger({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      level: 'info'
    }),
    new (winston.transports.File) ({
      name: 'api-warn',
      filename: r('../logs/api-warn.log'),
      level: 'warn',
      json: true
    }),
    new (winston.transports.File) ({
      name: 'api-error',
      filename: r('../logs/api-error.log'),
      level: 'error',
      json: true
    })
  ]
});

const guguLogger = new winston.Logger({
  transports: [
    new (winston.transports.File)({
      name: 'gugu-info',
      filename: r('../logs/gugu-info.log'),
      level: 'info'
    })
  ]
});

const apiInfoLogger = function (req, res, next) {
  apiLogger.info(`[${req.method}] - ${req.url} - ${req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip} - ${req.headers['user-agent']} - ${new Date().toString()}`);
  next();
};

const apiWarnLogger = function (req, res, next) {
  apiLogger.warn({
    method: req.method,
    url: req.url,
    ip: req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip,
    ips: req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'] : req.ips,
    statusCode: res.statusCode,
    userAgent: req.headers['user-agent']
  });
  next();
};

const apiErrorLogger = function (req, res, err) {
  if (err) {
    apiLogger.error({
      method: req.method,
      url: req.url,
      ip: req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip,
      ips: req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'] : req.ips,
      statusCode: res.statusCode,
      headers: req.headers,
      error: {
        name: err.name,
        message: err.message,
        stack: err.stack
      }
    });
  } else {
    apiLogger.error({
      method: req.method,
      url: req.url,
      ip: req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip,
      ips: req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'] : req.ips,
      statusCode: res.statusCode,
      headers: req.headers
    });
  }
}


export {
  apiInfoLogger,
  apiWarnLogger,
  apiErrorLogger,
  guguLogger
};
