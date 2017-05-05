const logger = require('../services/logger');

module.exports = function (req, res, next) {
  logger.info(`[${req.method}] - ${req.url} - ${req.headers['user-agent']}`)
  next();
}
