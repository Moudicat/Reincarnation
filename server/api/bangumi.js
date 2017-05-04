const express = require('express');
const router = express.Router();
const Bangumi = require('../controllers/bangumi');
const authorization = require('../middleware/authorization');

let resData;
router.use((req, res, next) => {
  resData = {
    code: 0,
    msg: ''
  };
  next();
});

router.get('/search', (req, res, next) => {
  Bangumi.search(req.query.q).then(response => {
    resData.data = response;
    res.json(resData);
  }).catch (err => {
    console.log(err);
  });
});

// 以下的路由需要认证
router.use(authorization);

router.patch('/', (req, res, next) => {
  if (req.body instanceof Array) {
    const bangumiArr = req.body;
    add();
    function add() {
      if (bangumiArr.length === 0) return;
      Bangumi.add(bangumiArr[0]).then(response => {
        bangumiArr.shift();
        add();
      }).catch(err => {
        res.sendStatus(500);
        return;
      });
    }
  } else if (typeof req.body === 'object') {
    Bangumi.add(req.body).then(response => {
      res.json(response);
    }).catch(err => {
      res.sendStatus(500);
      return;
    });
  } else {
    res.status(400);
    resData.code = -1;
    resData.msg = '格式不正确';
    res.json(resData);
  }

  resData.msg = '添加成功，本次添加了' + req.body.length + '条数据';
  res.json(resData);
});


module.exports = router;
