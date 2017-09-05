import config from '../config';

export default app => {
  app.use((req, res, next) => {
    res.setHeader('X-Powered-By', `${config.app.appName}/${config.app.version}`);
    next();
  });
};
