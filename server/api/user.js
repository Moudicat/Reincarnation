const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../controllers/user');
const config = require('../config');

let resData;
router.use((req, res, next) => {
  resData = {
    code: 0,
    msg: ''
  };
  next();
});
// 列出用户信息
router.get('/', (req, res, next) => {
  res.json(resData);
});

// 获取该用户信息
router.get('/:username', (req, res, next) => {
  res.json(resData);
});

// 新建用户
router.post('/', (req, res, next) => {
  User.register(req.body).then(user => {
    const token = jwt.sign({
      uid: user._id,
      name: user.username,
      exp: Math.floor(+new Date / 1000) + 60 * 2 // 2 min
    }, config.jwt.secret);
    resData.token = token;
    resData.msg = '注册成功';
    res.json(resData);
  }).catch(err => {
    resData.code = -1;
    resData.msg = err;
    res.status(401);
    res.json(resData);
  });
});


module.exports = router;
