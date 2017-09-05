import { infoLogger, warnLogger } from '../services/logger';

export default app => {
  app.use(infoLogger);

  app.use('/api', require('../api/index.js'));

  app.use((req, res) => {
    app.use(warnLogger);
    res.sendStatus(404);
  });
};
