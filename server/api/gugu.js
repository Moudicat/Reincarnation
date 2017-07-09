/**
 * Created by Moudicat on 2017/7/9.
 */
const url = require('url');
const fs = require('fs');
const os = require('os');
const execSync = require('child_process').execSync;
const express = require('express');
const router = express.Router();
const authorization = require('../middleware/authorization');
const gugu = require('../services/gugu');
const guguLogger = require('../services/guguLogger');
const config = require('../config');

let resData, ipList = {};
router.use((req, res, next) => {
  resData = {
    code: 0,
    msg: ''
  };
  next();
});

router.post('/', (req, res) => {
  let ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  let type = req.body.type;
  let from = req.body.from;
  let name = req.body.name;
  let content = req.body.content;
  if (type === '' || from === '' || name === '' || content === '') {
    res.sendStatus(400);
    return;
  }

  let blackList = fs.readFileSync('./services/guguBlackList').toString().split('\n');
  if (blackList.indexOf(ip.split(',')[0]) !== -1) {
    guguLogger.info(`Reject gugu print for black ip, IP: ${ip}`);
    res.sendStatus(403);
    return;
  }

  // frequency limit
  if (ipList[ip] && ipList[ip] >= config.gugu.frequency) {
    guguLogger.info(`Reject gugu print for frequent operation, IP: ${ip}`);
    res.sendStatus(403);
    return;
  } else {
    if (ipList[ip]) {
      ipList[ip]++;
    } else {
      ipList[ip] = 1;
    }

    setTimeout(() => {
      ipList[ip]--;
    }, 1000 * 60 * 60 * 1); // 1h
  }

  if (name.length > 20 || content.length > 500) {
    res.sendStatus(400);
    return;
  }

  guguLogger.info(`[print] ${type} ${content}, IP: ${ip}`);
  let checkedIP;
  if (os.platform !== 'win32') {
    try {
      checkedIP = execSync(`curl -s http://ip.cn/${ip}`);
    } catch (err) {
      console.log(err);
      checkedIP = `IP: ${ip}`;
    }
  }
  switch (type) {
    case 'text':
      if (from === 'blog') {
        content = `--------------------------------\n来自博客-${name}\n${new Date().toLocaleString()}\n${checkedIP}\n${content}\n--------------------------------\n`;
      } else if (from === 'weibo') {
        content = `--------------------------------\n检测到微博更新-${name}\n${new Date().toLocaleString()}\n\n${content}\n--------------------------------\n`;
      }
      gugu.printText(content)
        .then(printcontentid => {
          resData.data = {
            printcontentid
          };
          resData.msg = '成功发送打印请求';
          res.json(resData);
        })
        .catch(e => {
          console.log(e);
          res.sendStatus(500);
        });
      break;
    case 'image':
      gugu.printImage(content)
        .then(printcontentid => {
          resData.data = {
            printcontentid
          };
          resData.msg = '成功发送打印请求';
          res.json(resData);
        })
        .catch(e => {
          console.log(e);
          res.sendStatus(500);
        });
      break;
    default:
      res.sendStatus(400);
  }
});

// 以下的路由需要认证
router.use(authorization);

module.exports = router;