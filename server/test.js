const schedule = require('node-schedule');
const formatDate = require('./services/utils');
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
  type: 0
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
      weatherOption.typeList = [0, 1, 11, 12, 81, 82, 91];
      break;
    case 1:
      weather.season = '夏季';
      weatherOption.baseTemperature = 30;
      weatherOption.typeList = [0, 1, 11, 12, 81, 82];
      break;
    case 2:
      weather.season = '秋季';
      weatherOption.baseTemperature = 15;
      weatherOption.typeList = [0, 1, 11, 12, 81, 82];
      break;
    case 3:
      weather.season = '冬季';
      weatherOption.baseTemperature = -10;
      weatherOption.typeList = [0, 1, 11, 82, 91, 92];
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
      if (temperature < weatherOption.baseTemperature) {
        if (seed < .2) {
          weather.type = 11;
        } else if ((seed - 0.2) < .1 && (seed - 0.2) > 0) {
            weather.type = 12;
        } else if ((seed - 0.3) < .2 && (seed - 0.3) > 0) {
          weather.type = 1;
        } else if ((seed - 0.5) < .05 && (seed - 0.5) > 0) {
          weather.type = 81;
        } else if ((seed - 0.55) < .05 && (seed - 0.55) > 0) {
          weather.type = 82;
        } else if (temperature < 0 && seed < 0.5) {
          weather.type = 91;
        } else if (seed < 0.9) {
          weather.type = 0;
        } else {
          weather.type = 1;
        }
      } else {
        if (seed < .06) {
          weather.type = 11;
        } else if ((seed - 0.06) < .04 && (seed - 0.06) > 0) {
            weather.type = 12;
        } else if ((seed - 0.1) < .2 && (seed - 0.1) > 0) {
          weather.type = 1;
        } else if ((seed - 0.3) < .05 && (seed - 0.3) > 0) {
          weather.type = 81;
        } else if ((seed - 0.35) < .05 && (seed - 0.35) > 0) {
          weather.type = 82;
        } else if (temperature < 0 && seed < 0.5) {
          weather.type = 91;
        } else if (seed < 0.9) {
          weather.type = 0;
        } else {
          weather.type = 1;
        }
      }
      break;
    case '夏季':
      if (temperature < weatherOption.baseTemperature) {
        if (seed < .2) {
          weather.type = 11;
        } else if ((seed - 0.2) < .1 && (seed - 0.2) > 0) {
            weather.type = 12;
        } else if ((seed - 0.3) < .2 && (seed - 0.3) > 0) {
          weather.type = 1;
        } else if ((seed - 0.5) < .05 && (seed - 0.5) > 0) {
          weather.type = 81;
        } else if ((seed - 0.55) < .05 && (seed - 0.55) > 0) {
          weather.type = 82;
        } else if (seed < 0.9) {
          weather.type = 0;
        } else {
          weather.type = 1;
        }
      } else {
        if (seed < .06) {
          weather.type = 0;
        } else if ((seed - 0.06) < .04 && (seed - 0.06) > 0) {
            weather.type = 0;
        } else if ((seed - 0.1) < .2 && (seed - 0.1) > 0) {
          weather.type = 1;
        } else if ((seed - 0.3) < .05 && (seed - 0.3) > 0) {
          weather.type = 0;
        } else if ((seed - 0.35) < .05 && (seed - 0.35) > 0) {
          weather.type = 0;
        } else if (seed < 0.9) {
          weather.type = 0;
        } else {
          weather.type = 1;
        }
      }
      break;
    case '秋季':
      if (temperature < weatherOption.baseTemperature) {
        if (seed < .2) {
          weather.type = 11;
        } else if ((seed - 0.2) < .1 && (seed - 0.2) > 0) {
            weather.type = 12;
        } else if ((seed - 0.3) < .2 && (seed - 0.3) > 0) {
          weather.type = 1;
        } else if ((seed - 0.5) < .05 && (seed - 0.5) > 0) {
          weather.type = 81;
        } else if ((seed - 0.55) < .05 && (seed - 0.55) > 0) {
          weather.type = 82;
        } else if (seed < 0.9) {
          weather.type = 0;
        } else {
          weather.type = 1;
        }
      } else {
        if (seed < .06) {
          weather.type = 11;
        } else if ((seed - 0.06) < .04 && (seed - 0.06) > 0) {
            weather.type = 12;
        } else if ((seed - 0.1) < .2 && (seed - 0.1) > 0) {
          weather.type = 1;
        } else if ((seed - 0.3) < .05 && (seed - 0.3) > 0) {
          weather.type = 81;
        } else if ((seed - 0.35) < .05 && (seed - 0.35) > 0) {
          weather.type = 82;
        } else if (seed < 0.9) {
          weather.type = 0;
        } else {
          weather.type = 1;
        }
      }
      break;
    case '冬季':
      if (temperature < weatherOption.baseTemperature) {
        if (seed < .2) {
          weather.type = 11;
        } else if ((seed - 0.2) < .1 && (seed - 0.2) > 0) {
            weather.type = 12;
        } else if ((seed - 0.3) < .2 && (seed - 0.3) > 0) {
          weather.type = 1;
        } else if ((seed - 0.5) < .05 && (seed - 0.5) > 0 && temperature < 0) {
          weather.type = 91;
        } else if ((seed - 0.55) < .05 && (seed - 0.55) > 0 && temperature < 0) {
          weather.type = 92;
        } else if (temperature > 0 && seed < 0.5) {
          weather.type = 81;
        } else if (seed < 0.9) {
          weather.type = 0;
        } else {
          weather.type = 1;
        }
      } else {
        if (seed < .06) {
          weather.type = 11;
        } else if ((seed - 0.06) < .04 && (seed - 0.06) > 0) {
            weather.type = 12;
        } else if ((seed - 0.1) < .2 && (seed - 0.1) > 0) {
          weather.type = 1;
        } else if ((seed - 0.3) < .05 && (seed - 0.3) > 0 && temperature < 0) {
          weather.type = 91;
        } else if ((seed - 0.35) < .05 && (seed - 0.35) > 0 && temperature < 0) {
          weather.type = 92;
        } else if (temperature > 0 && seed < 0.5) {
          weather.type = 81;
        } else if (seed < 0.9) {
          weather.type = 0;
        } else {
          weather.type = 1;
        }
      }
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
    } else {
      weather.warning = '';
    }
    weather.temperature = newTemperature;
    setType(newTemperature);
  }
  weather.timestamp = timeC(+new Date() - weatherOption.baseTimestamp );
}

let weatherGenerator = () => {
  schedule.scheduleJob('1-59 * * * * *', () => {
    const randomSeed = Math.random();
    setWeather(randomSeed);
    console.log('weather:', JSON.stringify(weather));
    console.log('\n');
  });
}

weatherGenerator();
