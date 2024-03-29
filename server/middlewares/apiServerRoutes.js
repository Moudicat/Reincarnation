import { resolve } from 'path';
import fs from 'fs';
import config from '../config';

const controllersPath = resolve(__dirname, '../controllers');

export default app => {
  app.use(apiInfoLoggerMiddleware);

  // loading controllers
  fs.readdirSync(controllersPath)
    .filter(file => ~file.search(/^[^\.].*js$/))
    .map(file => new (require(resolve(controllersPath, file))['default'])().router)
    .forEach(routerFuc => app.use(config.api.prefix, routerFuc));

  app.use((req, res) => {
    app.use(apiWarnLoggerMiddleware);
    res.sendStatus(404);
  });
};
