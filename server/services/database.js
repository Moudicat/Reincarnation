import mongoose from 'mongoose';
import config from '../config';

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
