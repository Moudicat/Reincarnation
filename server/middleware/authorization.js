const jwt = require('jsonwebtoken');
const config = require('../config/');

module.exports = (req, res, next) => {
  const token = req.headers['x-mdc-token'];
  if (token === '') {
    res.sendStatus(401);
  } else {
    try {
      let tokenContent = jwt.verify(token, config.jwt.secret);
      console.log(tokenContent);
      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        res.status(401).send('Token expired.');
      } else {
        res.status(401).send('Invalid Token.');
      }
    }
  }
}
