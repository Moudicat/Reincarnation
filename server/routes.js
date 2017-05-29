/**
 * Created by Moudi on 2017/5/3.
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect(301, 'http://i.say.moe');
});

router.get('/admin--page', (req, res, next) => {
  if (req.query.t) {
    let time = +new Date();
    if (parseInt(req.query.t) < time && parseInt(req.query.t) + 100000 < time) { // 确保是在1分40秒内的时间戳
      res.sendfile("./static/index.html");
    } else {
      next();
    }
  }
});

module.exports = router;