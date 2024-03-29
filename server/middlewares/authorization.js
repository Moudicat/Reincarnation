import jwt from 'jsonwebtoken';
import config from '../config/';

export default (req, res, next) => {
  const token = req.cookies['X-MDC-Token'] ? req.cookies['X-MDC-Token'] : req.headers['x-mdc-token'];
  if (token === '') {
    res.sendStatus(401);
  } else {
    try {
      let tokenContent = jwt.verify(token, config.jwt.secret);
      req.username = tokenContent.name;
      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        res.status(401).send('Token expired.');
      } else {
        res.status(401).send('Invalid Token.');
      }
    }
  }
};
