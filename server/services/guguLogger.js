/**
 * Created by Moudicat on 2017/7/9.
 */
import winston from 'winston';

export default new winston.Logger({
  transports: [
    new (winston.transports.File) ({
      name: 'gugu-log',
      filename: './logs/gugu-info.log',
      level: 'info'
    })
  ]
});
