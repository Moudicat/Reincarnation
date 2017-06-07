/**
 * Created by Moudi on 2017/5/23.
 */
const express = require('express');
const router = express.Router();
const Status = require('../controllers/status');
const Animation = require('../controllers/animation');
const authorization = require('../middleware/authorization');

let resData;
router.use((req, res, next) => {
  resData = {
    code: 0,
    msg: ''
  };
  next();
});

router.get('/', (req, res) => {
  Status.get()
    .then(response => {
      if (response.length === 0) {
        resData.msg = '无数据';
        resData.code = -404;
        res.json(resData);
      } else {
        resData.data = response[0];
        Animation.getLatest()
          .then(response => {
            let animationObj = {
              name: '最近看的番',
              content: response.data.name,
              num: response.data.episode
            };
            resData.data.push(animationObj);
            res.json(resData);
          })
          .catch(err => {
            console.error(err);
            res.sendStatus(500);
            return;
          });
      }
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

// 以下的路由需要认证
router.use(authorization);

router.patch('/', (req, res) => {
  if (!req.body.status && req.body.status.length === 0 && !(req.body.status instanceof Array)) {
    res.sendStatus(400);
  } else {
    Status.update(req.body).then(response => {
      resData.msg = '添加成功';
      res.json(resData);
    }).catch(err => {
      res.sendStatus(500);
    });
  }
});

module.exports = router;