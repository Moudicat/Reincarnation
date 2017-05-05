/**
 * Created by Moudi on 2017/5/3.
 */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const cors = require('./middleware/cors');
const requestLogger = require('./middleware/logger');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 跨域中间件
app.use(cors());

//
app.use(requestLogger());

app.use('/api', require('./api'));

// fixed: mpromise is deprecated;
mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${config.host}:${config.port}/${config.db}`, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log('已成功连接到数据库');
    app.listen(2777, () => {
      console.log('服务启动127.0.0.1:2777');
    });
  }
});
