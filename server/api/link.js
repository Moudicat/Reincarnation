const express = require('express');
const router = express.Router();
const Link = require('../controllers/link');
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
  Link.list()
    .then(response => {
      if (response.length === 0) {
        resData.msg = '无数据';
        resData.code = -404;
        res.json(resData);
      } else {
        resData.data = response;
        res.json(resData);
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
  if (!req.body.name || !req.body.address || !req.body.owner) {
    res.sendStatus(400);
    return;
  }
    Link.add(req.body)
      .then(response => {
        resData.msg = '添加成功';
        res.json(resData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      })
});

router.delete('/:id', (req, res) => {
  Link.remove(req.params.id)
    .then(() => {
      resData.msg = '成功删除';
      res.json(resData);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
});


module.exports = router;
