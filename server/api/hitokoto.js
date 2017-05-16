/**
 * Created by Moudi on 2017/5/11.
 */
const express = require('express');
const router = express.Router();
const Hitokoto = require('../controllers/hitokoto');
const authorization = require('../middleware/authorization');

let resData;
router.use((req, res, next) => {
  resData = {
    code: 0,
    msg: ''
  };
  next();
});

router.get('/', (req, res, next) => {
  Hitokoto.get().then(response => {
    if (response.length === 0) {
      resData.msg = '无数据';
      resData.code = -404;
      res.json(resData);
    } else {
      delete(response[0]._id);
      resData.data = response[0];
      res.json(resData);
    }
  }).catch(err => {
    console.error(err);
    resData.msg = err;
    resData.code = -500;
    res.json(resData);
  });
});

// 以下的路由需要认证
router.use(authorization);

// content  need
router.patch('/', (req, res, next) => {
  Hitokoto.add(req.body).then(response => {
    resData.msg = '添加成功';
    res.json(resData);
  }).catch(err => {
    res.sendStatus(500);
  });
});


module.exports = router;