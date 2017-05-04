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

// 以下的路由需要认证
router.use(authorization);

router.patch('/', (req, res) => {
  /*
     title: String,
     author: String,
     postTime: String,
     modifiedTime: String,
     status: String,
     content: String
  */
  let articleObj = req.body;
  if (!(articleObj.title && articleObj.author && articleObj.status && articleObj.content)) {
    res.sendStatus(400);
    return;
  }
  Article.add(articleObj).then(response => {
    resData.data = response;
    res.json(resData);
  }).catch(err => {
    resData.msg = err;
    resData.code = -1;
    res.status(500);
    res.json(resData);
  })
});


module.exports = router;
