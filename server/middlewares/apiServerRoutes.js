import { infoLogger, warnLogger } from '../services/logger';

export default app => {
  app.use(infoLogger);

  let a = require('../controllers/animation.js')['default'];

  app.use('/api', new a().router);
  app.use((req, res) => {
    app.use(warnLogger);
    res.sendStatus(404);
  });
};
