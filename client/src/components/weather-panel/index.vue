<template>
  <div class="weather-panel">
    <h3>圣都月之森</h3>
    <span>当地时间 <r-tag type="gray"><time>{{weather.timestamp | time}}</time></r-tag></span>
    <ul class="weather-panel-list">
      <li>
        温度
        <r-tag :type="temperatureType">{{weather.temperature}}℃</r-tag>
      </li>
      <li>
        季节
        <r-tag :type="seasonType">{{weather.season}}</r-tag>
      </li>
      <li>
        天气
        <r-tag :type="typeType">{{weather.type}}</r-tag>
      </li>
      <li>
        天气预警
        <r-tag :type="warningType">{{weather.warning ? weather.warning : '无'}}</r-tag>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import Weather from 'services/weather';
  import Tag from 'components/tag';
  import {formatDate} from 'services/utils';
  export default {
    data() {
      return {
        weather: {},
        timer: null,
        count: 120
      };
    },
    methods: {
      calcTime() {
        this.timer = setInterval(() => {
          this.weather.timestamp += 1000;
          this.count++;
          if (this.count >= 120) {
            this.count = 0;
            let s = null;
            let t = null;
            let hours = new Date(this.weather.timestamp).getHours();
            if (this.weather.season === '春季') {
              s = 1;
            } else if (this.weather.season === '夏季') {
              s = 2;
            } else if (this.weather.season === '秋季') {
              s = 3;
            } else {
              s = 4;
            }
            if (hours > 6 && hours < 11) {
              t = '0800';
            } else if (hours >= 11 && hours < 17) {
              t = '1200';
            } else if (hours >= 17 && hours < 20) {
              t = '1800';
            } else {
              t = '2200';
            }
            this.$store.commit('global/SET_BGURL', `${s}_${t}`);
          }
        }, 1000);
      }
    },
    computed: {
      temperatureType() {
        if (this.weather.temperature < 0) {
          return 'blue';
        } else if (this.weather.temperature < 20) {
          return 'green';
        } else if (this.weather.temperature < 35) {
          return 'orange';
        } else {
          return 'red';
        }
      },
      seasonType() {
        if (this.weather.season === '春季') {
          return 'green';
        } else if (this.weather.season === '夏季') {
          return 'red';
        } else if (this.weather.season === '秋季') {
          return 'orange';
        } else {
          return 'blue';
        }
      },
      typeType() {
        const t = this.weather.type;
        if (t === '晴' || t === '多云') {
          return 'gray';
        } else if (t === '小雨' || t === '大雨' || t === '大雪' || t === '小雪') {
          return 'blue';
        } else if (t === '雷电') {
          return 'red';
        } else {
          return '';
        }
      },
      warningType() {
        if (this.weather.warning === '') {
          return '';
        } else {
          return 'red';
        }
      }
    },
    beforeMount() {
      Weather.get()
        .then(response => {
          if (response.data) {
            this.weather = response.data;
            this.calcTime();
          } else {
            throw new Error('内部错误');
          }
        })
        .catch(err => {
          this.weather = {
            temperature: '传感器离线',
            season: '未知',
            timestamp: 0,
            type: '未知',
            warning: err.message
          };
        });
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    filters: {
      time(t) {
        return formatDate(new Date(t), '教会历yyyy年MM月dd日 hh:mm:ss', true);
      }
    },
    components: {
      rTag: Tag
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .weather-panel {
    position: relative;
    padding: 20px;
    border: 1px solid #d1dbe5;
    border-radius: 4px;
    /*background: url("./img/sunset.png") no-repeat;*/
    /*background-size: cover;*/
    background-color: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .11), 0 0 4px 0 rgba(0, 0, 0, .04);
    > h3 {
      font-size: 18px;
    }
    > span {
      display: block;
      font-size: 12px;
      text-align: center;
      margin: 5px 0 10px 0;
    }
    .weather-panel-list {
      line-height: 48px;
      .tag {
        position: absolute;
        margin-top: 12px;
        left: 50%;
      }
    }
  }
</style>
