/**
 * Created by Moudicat on 2017/7/9.
 */
const Memobird = require('Memobird');
const config = require('../config');

let gugu = new Memobird({
  ak: config.gugu.ak,
  memobirdID: config.gugu.memobirdID,
  useridentifying: config.gugu.useridentifying
});

gugu.init();

module.exports = gugu;