/**
 * Created by Moudi on 2017/5/3.
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect(301, 'http://i.say.moe');
});

router.get('/admin--page', (req, res) => {
  if (req.query.tt) {
    let time = Math.floor(+new Date() / 1000);
    console.log(parseInt(req.query.t), time);
    if (parseInt(req.query.tt) < time && parseInt(req.query.tt) > time - 100) { // 确保是在1分40秒内的时间戳
      res.sendFile("./static/index.html", {root: __dirname});
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;