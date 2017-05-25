/**
 * Created by Moudi on 2017/5/4.
 */
const express = require('express');
const router = express.Router();
const Article = require('../controllers/article');
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
  Article.list().then(response => {
    resData.data = response;
    res.json(resData);
  }).catch (err => {
    console.log(err);
    res.sendStatus(500);
  });
});

router.get('/:id', (req, res) => {
  Article.getOne(req.params.id)
    .then(response => {
      resData.data = response;
      res.json(resData);
    })
    .catch (err => {
      console.error(err);
      res.sendStatus(500);
    });
});

// 以下的路由需要认证
router.use(authorization);

router.post('/', (req, res) => {
  /*
     title: String,
     author: String,
     postTime: String,
     modifiedTime: String,
     status: String,
     content: String,
     description: String,
     banner: String
  */
  let articleObj = req.body;
  if (!(articleObj.title && articleObj.author && articleObj.status && articleObj.content)) {
    res.sendStatus(400);
    return;
  }
  Article.add(articleObj).then(response => {
    if (response._id) {
      resData.msg = '成功';
      res.json(resData);
    } else {
      throw new Error('处理失败');
    }
  }).catch(err => {
    res.sendStatus(500);
  });
});

// 后台列出全部
router.get('/all', (req, res) => {
  Article.listAll().then(response => {
    resData.data = response;
    res.json(resData);
  }).catch (err => {
    console.log(err);
    res.sendStatus(500);
  });
});

// 更新文章
router.patch('/:id', (req, res) => {
  Article.setStatus(req.params.id, req.body.articleObj)
    .then(response => {
      resData.msg = '修改成功';
      res.json(resData);
    })
    .catch(err => {
      resData.msg = err.message;
      res.json(resData);
    })
});

// 修改发布状态
router.patch('/:id/status', (req, res) => {
  Article.setStatus(req.params.id, req.body.status)
    .then(response => {
      resData.msg = '修改成功';
      res.json(resData);
    })
    .catch(err => {
      resData.msg = err.message;
      res.json(resData);
    })
});

module.exports = router;
