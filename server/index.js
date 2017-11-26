/**
 * Created by Moudi on 2017/5/3.
 */
import express from 'express';
import config from './config/';
import { resolve } from 'path';
import {
  apiInfoLogger as apiInfoLoggerMiddleware,
  apiWarnLogger as apiWarnLoggerMiddleware,
  apiErrorLogger as aelog,
  guguLogger
} from './services/logger';

import WebSocketServer from './services/websocket';

global.aelog = aelog;
global.guguLogger = guguLogger;
global.apiInfoLoggerMiddleware = apiInfoLoggerMiddleware;
global.apiWarnLoggerMiddleware = apiWarnLoggerMiddleware;

global.isProd = config.env === 'production';

const r = path => resolve(__dirname, path);

class ApiServer {
  constructor() {
    this.app = express();

    //ws
    this.wss = new WebSocketServer(this.app);

    this.MIDDLEWARE = ['cors', 'bodyParser', 'cookieParser', 'custom', 'apiServerRoutes'];
    this.SERVICES = ['database', 'weatherSystem'];

    this.registerServices();
    this.registerMiddleware(this.app);
  }

  registerMiddleware(app) {
    this.MIDDLEWARE.forEach(middlewareName => {
      require(`${r(`./middlewares/${middlewareName}`)}`)['default'](app);
    });
  }

  registerServices() {
    this.SERVICES.forEach(servicesName => {
      require(`${r(`./services/${servicesName}`)}`)['default']();
    });
  }

  start() {
    if (isProd) {
      this.app.listen(config.app.port, () => {
          console.log(`线上模式: 端口${config.app.port}`);
        });
    } else {
      this.app.listen(config.app.port, () => {
        console.log(`本地开发模式: 端口${config.app.port}`);
      });
    }
  }
}

const apiServer = new ApiServer();
apiServer.start();
