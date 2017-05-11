const Logger = require('../services/logger');

const infoLogger = function (req, res, next) {
  Logger.info(`[${req.method}] - ${req.url} - ${req.ip} - ${req.headers['user-agent']} - ${new Date().toString()}`);
  next();
};

const warnLogger = function (req, res, next) {
  Logger.warn({
    method: req.method,
    url: req.url,
    ip: req.ip,
    ips: req.ips,
    statusCode: res.statusCode,
    userAgent: req.headers['user-agent']
  });
  next();
};

const errorLogger = function (req, res, next) {
  Logger.warn({
    method: req.method,
    url: req.url,
    ip: req.ip,
    ips: req.ips,
    statusCode: res.statusCode,
    headers: req.headers
  });
  next();
};

module.exports = {
  infoLogger,
  warnLogger,
  errorLogger
};
