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
        count: 120,
        disableChange: false
      };
    },
    methods: {
      calcTime() {
        this.timer = setInterval(() => {
          this.weather.timestamp += 1000;
          if (this.disableChange) return;
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
      },
      checkWeather() {
        switch (this.weather.type) {
          case '小雨':
            this.$emit('weatherChange', 'rain');
            break;
          case '大雨':
            this.$emit('weatherChange', 'heavyRain');
            break;
          case '小雪':
          case '大雪':
            this.$emit('weatherChange', 'snow');
            break;
          default:
            switch (this.weather.season) {
              case '夏季':
                // 晚间萤火虫
                if (this.$store.state.global.bgUrl.indexOf('2200') > -1) {
                  this.$emit('weatherChange', 'fireflies');
                }
                break;
              case '秋季':
                // 晚间星空
                if (this.$store.state.global.bgUrl.indexOf('2200') > -1) {
                  this.$emit('weatherChange', 'star');
                }
                break;
              case '冬季':
                // 晚间星空
                if (this.$store.state.global.bgUrl.indexOf('2200') > -1) {
                  this.$emit('weatherChange', 'star');
                }
                break;
            }
        }
      },
      checkFestival() {
        let festivalMap = [{
          time: ['/10/29', '/10/30', '/10/31', '/11/01', '/11/02'],
          name: '万圣节',
          code: 'Halloween',
          banner: 'Halloween-1',
          tip: {
            title: 'Trick or Treat!',
            message: 'The sky is blue, the grass is green, may we have our Halloween. (不给糖就捣蛋!)',
            confirmText: '好好好(40秒背景音乐注意)',
            cancelText: '无视'
          },
          musicUrl: 'https://moudicat-data.oss-cn-beijing.aliyuncs.com/cdn/music/TRICK%20or%20TREAT.mp3',
          avatarUrl: 'https://moudicat-data.oss-cn-beijing.aliyuncs.com/cdn/images/avatar_Halloween.png'
        }];

        let isFestival = false;
        let festival = null;
        festivalMap.forEach((fastival) => {
          fastival.time.forEach(time => {
            if (new Date().toLocaleDateString().indexOf(time) > -1) {
              isFestival = true;
              festival = {
                name: fastival.name,
                code: fastival.code,
                banner: fastival.banner,
                tip: fastival.tip,
                musicUrl: fastival.musicUrl,
                avatarUrl: fastival.avatarUrl
              };
            }
          });
        });

        return {
          isFestival,
          festival
        };
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
            setTimeout(() => {
              this.checkWeather();
            }, 2000);
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

      let festivalObj = this.checkFestival();

      if (festivalObj.isFestival) {
        this.disableChange = true;

        this.$store.commit('global/SET_BGURL', festivalObj.festival.banner);
        this.$store.commit('header/SET_AVATARURL', festivalObj.festival.avatarUrl);

        setTimeout(() => {
          this.$confirm({
            title: festivalObj.festival.tip.title,
            message: festivalObj.festival.tip.message,
            confirmText: festivalObj.festival.tip.confirmText,
            cancelText: festivalObj.festival.tip.cancelText
          }).then(() => {
            let audioElement = document.createElement('audio');
            audioElement.autoplay = 'autoplay';
            let sourceElement = document.createElement('source');
            sourceElement.src = festivalObj.festival.musicUrl;
            sourceElement.type = 'audio/mp3';
            audioElement.appendChild(sourceElement);
          }).catch(() => {});
        }, 0);
      }
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
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    padding: 5px;
    border: 1px solid $primary-background;
    border-radius: 0 0 4px 4px;
    border-top: 0;
    box-shadow: $primary-boxshadow;
    line-height: 22px;
    text-shadow: #aaaaaa 1px 1px 1px;
    transition: .4s;
    background-color: $primary-background;
    color: #242424;
    user-select: none;
    > h3 {
      font-weight: 500;
    }
    > span {
      display: block;
      margin-left: 20px;
    }
    .weather-panel-list {
      display: flex;
      margin-left: 20px;
      li {
        margin-right: 10px;
      }
    }
    &:hover {
      background-color:  rgba(255, 255, 255, .8);
    }
  }
</style>
