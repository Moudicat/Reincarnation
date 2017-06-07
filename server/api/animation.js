/**
 * Created by Moudi on 2017/6/4.
 */
const express = require('express');
const router = express.Router();
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

router.get('/latest', (req, res) => {
  Animation.getLatest()
    .then(response => {
      resData.data = response;
      res.json(resData);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.get('/:id', (req, res) => {
  if (req.params.id) {
    Animation.getOne(req.params.id)
      .then(response => {
        resData.data = response;
        res.json(resData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  } else {
    Animation.get()
      .then(response => {
        resData.data = response;
        res.json(resData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  }
});

// 以下的路由需要认证
router.use(authorization);

router.patch('/:id', (req, res) => {
  if (req.params.id) {
    Animation.update(req.body)
      .then(() => {
        resData.msg = '修改成功';
        res.json(resData);
      })
      .catch(err => {
        res.sendStatus(500);
        console.log(err);
      });
  } else {
    if (req.body instanceof Array) {
      const animationArr = req.body;
      add();
      function add() {
        if (animationArr.length === 0) return;
        Animation.add(animationArr[0])
          .then(() => {
            animationArr.shift();
            add();
          })
          .catch(err => {
            res.sendStatus(500);
            console.log(err);
            return;
          });
      }
      resData.msg = '添加成功，本次添加了' + req.body.length + '条数据';
      res.json(resData);
    } else if (typeof req.body === 'object') {
      Animation.add(req.body)
        .then(() => {
          resData.msg = '添加成功，本次添加了1条数据';
          res.json(resData);
        })
        .catch(err => {
          res.sendStatus(500);
          console.log(err);
        });
    } else {
      res.sendStatus(400);
    }
  }

});

router.delete('/:id', (req, res) => {
  if (!req.params.id) {
    res.sendStatus(400);
    return;
  }
  Animation.remove(req.params.id)
    .then(() => {
      resData.msg = '成功删除';
      res.json(resData);
    })
    .catch(err => {
      res.sendStatus(500);
      console.log(err);
    });
});

module.exports = router;
