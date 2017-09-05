/**
 * Created by Moudi on 2017/5/26.
 */

const express = require('express');
const router = express.Router();

let resData;
router.use((req, res, next) => {
  resData = {
    code: 0,
    msg: ''
  };
  next();
});

router.get('/', (req, res) => {
    global.weather.timestamp = +new Date() - 1495199400000;
    resData.data = global.weather;
    res.json(resData);
});

module.exports = router;
