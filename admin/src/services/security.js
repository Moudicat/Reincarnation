/**
 * Created by reddy on 2017/5/3.
 */
const crypto = require('crypto');

const secret = 'reincarnation!@#$%^&**';

export function sha256(password) {
  return crypto.createHmac('sha256', secret).update(password).digest('hex');
}
