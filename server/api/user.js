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
router.get('/', (req, res, next) => {
  res.json(resData);
});

module.exports = router;
