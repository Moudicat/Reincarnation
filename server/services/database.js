import mongoose from 'mongoose';
import fs from 'fs';
import { resolve } from 'path';
import config from '../config';

const modelsPath = resolve(__dirname, '../models');

// 注册数据库模型
fs.readdirSync(modelsPath)
  .filter(file => ~file.search(/^[^\.].*js$/))
  .forEach(file => require(resolve(modelsPath, file)));

export default () => {
  // fix: mpromise is deprecated;
  mongoose.Promise = global.Promise;
  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.db}`, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`已成功连接到数据库: ${config.db.host}:${config.db.port}/${config.db.db}`);
    }
  });
}
