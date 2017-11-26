const schedule = require('node-schedule');
const probable = require('probable');
import { formatDate } from './utils';
/**
  type
    0 晴
    1 多云
    11 小雨
    12 大雨
    81 雷电
    82 大风
    91 小雪
    92 大雪
*/
global.weather = {
  timestamp: 0,
  temperature: NaN,
  warning: '',
  season: '未知',
  type: '晴'
};
global.weatherOption = {
  baseTemperature: 30,
  badWeatherProbability: .1,
  baseTimestamp: 1495199400000,
  highTemperature: 38,
  lowTemperature: -15,
  typeList: []
};

// 正态分布随机数生成器
function getNumberInNormalDistribution (mean, std_dev, limit) {
  if (limit) {
    return parseFloat((mean + (randomNormalDistribution() * std_dev)).toFixed(limit));
  } else {
    return mean + (randomNormalDistribution() * std_dev);
  }
}
function randomNormalDistribution(){
    let u = 0.0, v = 0.0, w = 0.0, c = 0.0;
    do {
        u = Math.random() * 2 - 1.0;
        v = Math.random() * 2 - 1.0;
        w = u * u + v * v;
    } while (w == 0.0 || w >= 1.0);
    // Box-Muller转换
    c = Math.sqrt((-2 * Math.log(w)) / w);
    return u * c;
}
function timeC (timestamp) {
  let time = new Date(timestamp);
  time.setFullYear(time.getFullYear() - 1970);
  return formatDate(time, 'yyyy-MM-dd hh:mm:ss');
}

function setBaseInfo() {
  let nowTime = timeC(+new Date() - weatherOption.baseTimestamp );
  let nowMonth = Number(nowTime.match(/\d{1,4}-(\d{1,2})-/)[1]);
  switch (nowMonth % 4) {
    case 0:
      weather.season = '春季';
      weatherOption.baseTemperature = 10;
      break;
    case 1:
      weather.season = '夏季';
      weatherOption.baseTemperature = 30;
      break;
    case 2:
      weather.season = '秋季';
      weatherOption.baseTemperature = 15;
      break;
    case 3:
      weather.season = '冬季';
      weatherOption.baseTemperature = -10;
      break;
  }
}

function setType(temperature) {
  const seed = Math.random();
  /**
    type
      0 晴
      1 多云

      11 小雨
      12 大雨

      81 雷电
      82 大风
      91 小雪
      92 大雪
  */
  switch (weather.season) {
    case '春季':
      var t = '';
      if (temperature < weatherOption.baseTemperature) {
        // 气温小于平均气温
        if (temperature < 0) {
          // 当气温低于0度
          t = probable.createTableFromDef({
            '0-10': '晴',
            '11-50': '多云',
            '51-100': {
              '0-30': '大风',
              '31-100': '小雪'
            }
          }).roll();
        } else {
          t = probable.createTableFromDef({
            '0-30': '晴',
            '31-60': '多云',
            '61-100': {
              '0-10': '大风',
              '11-30': '雷电',
              '31-70': '小雨',
              '71-100': '大雨'
            }
          }).roll();
        }
      } else {
        // 气温大于平均气温
        t = probable.createTableFromDef({
          '0-70': '晴',
          '71-90': '多云',
          '91-100': {
            '0-50': '大风',
            '51-100': '雷电'
          }
        }).roll();
      }
      weather.type = t;
      break;
    case '夏季':
      var t = '';
      if (temperature < weatherOption.baseTemperature) {
        t = probable.createTableFromDef({
          '0-30': '晴',
          '31-60': '多云',
          '61-100': {
            '0-10': '大风',
            '11-30': '雷电',
            '31-70': '小雨',
            '71-100': '大雨'
          }
        }).roll();
      } else {
        t = probable.createTableFromDef({
          '0-80': '晴',
          '81-95': '多云',
          '96-100': {
            '0-50': '大风',
            '51-100': '雷电'
          }
        }).roll();
      }
      weather.type = t;
      break;
    case '秋季':
      var t = '';
      if (temperature < weatherOption.baseTemperature) {
        // 气温小于平均气温
        if (temperature < 0) {
          // 当气温低于0度
          t = probable.createTableFromDef({
            '0-10': '晴',
            '11-50': '多云',
            '51-100': {
              '0-30': '大风',
              '31-100': '小雪'
            }
          }).roll();
        } else {
          t = probable.createTableFromDef({
            '0-30': '晴',
            '31-60': '多云',
            '61-100': {
              '0-10': '大风',
              '11-30': '雷电',
              '31-70': '小雨',
              '71-100': '大雨'
            }
          }).roll();
        }
      } else {
        // 气温大于平均气温
        t = probable.createTableFromDef({
          '0-70': '晴',
          '71-90': '多云',
          '91-100': {
            '0-50': '大风',
            '51-100': '雷电'
          }
        }).roll();
      }
      weather.type = t;
      break;
    case '冬季':
      var t = '';
      if (temperature < weatherOption.baseTemperature) {
        t = probable.createTableFromDef({
          '0-10': '晴',
          '11-30': '多云',
          '31-100': {
            '0-10': '大风',
            '11-60': '小雪',
            '61-100': '大雪'
          }
        }).roll();
      } else {
        if (temperature > 0) {
          t = probable.createTableFromDef({
            '0-80': '晴',
            '81-100': '多云'
          }).roll();
        } else {
          t = probable.createTableFromDef({
            '0-70': '晴',
            '71-80': '多云',
            '81-100': {
              '0-20': '大风',
              '21-100': '小雪'
            }
          }).roll();
        }
      }
      weather.type = t;
      break;
  }
}

function setWeather(seed) {
  setBaseInfo();
  if (isNaN(weather.temperature)) {
    weather.temperature = getNumberInNormalDistribution(weatherOption.baseTemperature, 5, 1);
  } else {
    let newTemperature;
    if (seed < weatherOption.badWeatherProbability) {
      newTemperature = getNumberInNormalDistribution(weatherOption.baseTemperature, 8, 1);
    } else {
      let oldTemperature = weather.temperature;
      newTemperature = getNumberInNormalDistribution(weatherOption.baseTemperature, 5, 1);

      while (Math.abs(newTemperature - oldTemperature) > 6) {
        newTemperature = getNumberInNormalDistribution(weatherOption.baseTemperature, 5, 1);
      }
    }
    if (newTemperature > weatherOption.highTemperature) {
      weather.warning = '高温警报';
    } else if (newTemperature < weatherOption.lowTemperature) {
      weather.warning = '低温警报';
    } else if (seed < weatherOption.badWeatherProbability) {
      weather.warning = '大气状况不稳定';
    } else {
      weather.warning = '';
    }
    weather.temperature = newTemperature;
    setType(newTemperature);
  }
}

let weatherGenerator = () => {
  const randomSeed = Math.random();
  setWeather(randomSeed);
  schedule.scheduleJob('0 0 0,4,8,12,16,20 * * *', () => {
    const randomSeed = Math.random();
    setWeather(randomSeed);
  });
};

export default weatherGenerator;
