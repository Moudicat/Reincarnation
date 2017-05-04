/**
 * Created by Moudi on 2017/5/3.
 */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, X-MDC-Token, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Max-Age", '172800');
  res.header("X-Powered-By", 'Reincarnation');
  next();
});

app.use('/api', require('./api'));

mongoose.connect('mongodb://localhost:27777', (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log('已成功连接到数据库');
    app.listen(2777, () => {
      console.log('服务启动127.0.0.1:2777');
    });
  }
});
