/**
 * Created by Moudi on 2017/5/3.
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.redirect(301, 'http://i.say.moe');
});

module.exports = router;