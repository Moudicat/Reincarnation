import { infoLogger, warnLogger } from '../services/logger';
import { resolve } from 'path';
import fs from 'fs';
import config from '../config';

const controllersPath = resolve(__dirname, '../controllers');

export default app => {
  app.use(infoLogger);

  // loading controllers
  fs.readdirSync(controllersPath)
    .filter(file => ~file.search(/^[^\.].*js$/))
    .map(file => new (require(resolve(controllersPath, file))['default'])().router)
    .forEach(routerFuc => app.use(config.api.prefix, routerFuc));

  app.use((req, res) => {
    app.use(warnLogger);
    res.sendStatus(404);
  });
};
