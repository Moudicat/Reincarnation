const express = require('express');
const router = express.Router();
const { addBangumi, searchBangumi }  = require('../controllers/bangumi');

let resData;
router.use((req, res, next) => {
  resData = {
    code: 0,
    msg: ''
  };
  next();
});

router.get('/search', (req, res, next) => {
  searchBangumi(req.query.q).then(response => {
    resData.data = response;
    res.json(resData);
  }).catch (err => {
    console.log(err);
  });
});

router.put('/add', (req, res, next) => {
  if (req.body instanceof Array) {
    const bangumiArr = req.body;
    add();
    function add() {
      if (bangumiArr.length === 0) return;
      addBangumi(bangumiArr[0]).then(response => {
        bangumiArr.shift();
        add();
      }).catch(err => {
        console.log(err);
      });
    }
  } else if (typeof req.body === 'object') {
    addBangumi(req.body).then(response => {
      res.json(response);
    }).catch(err => {
      console.log(err);
    });
  } else {
    req.code = -1;
    req.msg = '格式不正确';
  }

  resData.msg = '添加成功，本次添加了' + req.body.length + '条数据';
  res.json(resData);
});

module.exports = router;
