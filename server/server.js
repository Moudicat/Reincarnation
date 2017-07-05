/**
 * Created by Moudi on 2017/5/3.
 */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/index');
const cors = require('./middleware/cors');
const { infoLogger, warnLogger } = require('./middleware/logger');
const app = express();

if (process.env.NODE_ENV === 'production') {
  // 只开启https服务
  var fs = require('fs');
  var spdy = require('spdy');
  const options = {
    key: fs.readFileSync('/root/ssl/sayMoe/saymoe.key', 'utf8'),
    cert: fs.readFileSync('/root/ssl/sayMoe/saymoe.pem', 'utf8')
  }
  var httpsServer = spdy.createServer(options, app);
}
// 加载天气插件
const weatherGenerator = require('./services/weatherSystem');
// 加载天气生成
weatherGenerator();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('X-Powered-By', `${config.app.appName}/${config.app.version}`);
  next();
});
// 跨域中间件
app.use(cors);
app.use(cookieParser());

app.use(infoLogger);

app.use('/api', require('./api/index'));

app.use('/', require('./routes'));

app.use(express.static('./static'));

app.use((req, res) => {
  app.use(warnLogger);
  res.sendStatus(404);
});

// fixed: mpromise is deprecated;
mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.db}`, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log('已成功连接到数据库');
    if (process.env.NODE_ENV !== 'production') {
      app.listen(2777, () => {
        console.log('服务启动127.0.0.1:2777');
      });
    } else {
      httpsServer.listen(2777, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('服务启动https://say.moe');
        }
      });
    }
  }
});

