/**
 * Created by Moudicat on 2017/7/9.
 */
import Memobird from 'memobird';
import config from '../config';

let gugu = new Memobird({
  ak: config.gugu.ak,
  memobirdID: config.gugu.memobirdID,
  useridentifying: config.gugu.useridentifying
});

gugu.init();

export default gugu;
