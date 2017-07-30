<template>
  <header>
    <h1>某迪猫|结束与起始之界</h1>
    <div class="background-wrapper" ref="backgroundWrapper" :class="{'article-mode': articleMode}" :style="{'background': backgroundUrl}">
      <WeatherPanel @weatherChange="weatherChange"/>
      <div class="hitokoto-wrapper">
        <p class="hitokoto" v-show="hitokoto">『{{ hitokoto }}』</p>
      </div>
      <canvas id="weather"></canvas>
    </div>
    <transition name="fade">
      <Sticky v-if="!articleMode">
        <div class="nav-wrapper">
          <div class="nav-container">
            <div class="avatar-wrapper" :class="{mini: miniAvatarState}">
              <img src="https://moudicat-data.oss-cn-beijing.aliyuncs.com/cdn/images/avatar_400x400.jpg" alt="avatar">
            </div>
            <div class="profile-mini-wrapper" :class="{mini: miniAvatarState}">
              <div class="profile-mini">
                <img src="https://moudicat-data.oss-cn-beijing.aliyuncs.com/cdn/images/avatar_400x400.jpg"
                     alt="mini-avatar">
                <div class="info">
                  <h3>某迪</h3>
                  <p>More cooperation, no competition.</p>
                </div>
              </div>
            </div>
            <nav>
              <router-link to="/" class="nav-link">
                <span>文章</span>
              </router-link>
              <router-link to="/animation" class="nav-link">
                <span>番剧列表</span>
              </router-link>
              <router-link to="/links" class="nav-link">
                <span>友情链接</span>
              </router-link>
              <router-link to="/memobird" class="nav-link">
                <span>递小纸条</span>
              </router-link>
              <router-link to="/about" class="nav-link">
                <span>关于本站</span>
              </router-link>
            </nav>
          </div>
        </div>
      </Sticky>
    </transition>
  </header>
</template>

<script type="text/ecmascript-6">
  import Sticky from 'components/Sticky';
  import Hitokoto from 'services/hitokoto';
  import WeatherPanel from 'components/weather-panel';
  import Rain from 'services/weatherSystem/Rain';
  import Snow from 'services/weatherSystem/Snow';

  export default {
    data() {
      return {
        hitokoto: ''
      };
    },
    methods: {
      weatherChange(name) {
        cancelAnimationFrame(window.cavasRAF);
        this.$refs.backgroundWrapper.removeChild(document.getElementById('weather'));
        let canvas = document.createElement('canvas');
        canvas.id = 'weather';
        this.$refs.backgroundWrapper.appendChild(canvas);
        let weather = null;
        switch (name) {
          case 'snow':
            weather = new Snow();
            weather.init();
            break;
          case 'rain':
            weather = new Rain();
            weather.init();
            break;
        }
      }
    },
    computed: {
      miniAvatarState() {
        return this.$store.state.header.miniAvatarState;
      },
      articleMode() {
        return this.$store.state.header.articleModeState;
      },
      backgroundUrl() { // 'url(' + require('../assets/images/1.jpg') + ')'
        return `url('https://moudicat-data.oss-cn-beijing.aliyuncs.com/cdn/images/banner/${this.$store.state.global.bgUrl}.png') center center`;
      }
    },
    beforeMount() {
      Hitokoto.get().then(response => {
        let h = response.data.content;
        let t = () => {
          this.hitokoto += h.substring(0, 1);
          h = h.substring(1);
          if (h.length !== 0) {
            setTimeout(() => {
              t();
            }, Math.random() * 100 + 40);
          } else {
            h = t = null;
          }
        };
        setTimeout(() => {
          t();
        }, 2000);
      });
    },
    components: {
      Sticky,
      WeatherPanel
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  header {
    flex: 0 0 460px;
    height: 460px;
    h1 {
      display: none;
      font-size: 0;
      text-indent: -9999px;
    }
    #weather {
      width: 100%;
      height: 100%;
    }
    .background-wrapper {
      position: relative;
      height: 400px;
      background-size: cover !important;
      &::after {
        content: '';
        display: block;
        width: 200%;
        height: 100%;
        border-radius: 50%;
        transform: translate3d(-25%, 0%, 0);
        background-color: #f5f8fa;
        opacity: 0;
        transition: .9s;
      }
      &.article-mode {
        &::after {
          transform: translate3d(-25%, -10%, 0);
          opacity: 1;
        }
      }
      .hitokoto-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: inherit;
        width: 100%;
        .hitokoto {
          text-shadow: #575757 1px 1px 1px;
          font-size: 32px;
          color: rgba(255, 255, 255, .85);
          transition: .4s;
          &:hover {
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
    .nav-wrapper {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
      background-color: #fff;
    }
    .nav-container {
      display: flex;
      position: relative;
      height: 60px;
      max-width: 1190px;
      margin: 0 auto;
      background-color: #fff;
      .avatar-wrapper {
        position: absolute;
        top: -95px;
        left: 10px;
        z-index: 1001;
        width: 190px;
        height: 190px;
        border: 5px solid #fff;
        border-radius: 12px;
        box-shadow: 0 1px 1px rgba(136, 153, 166, 0.15);
        overflow: hidden;
        transition: .6s;
        > img {
          width: 180px;
          height: 180px;
        }
        &.mini {
          height: 0;
          opacity: 0;
        }
      }
      .profile-mini-wrapper {
        width: 20%;
        height: 60px;
        margin-left: 10px;
        padding-top: 60px;
        transition: .6s;
        overflow: hidden;
        .profile-mini {
          display: flex;
          justify-content: space-around;
          padding: 10px 0;
          transition: .5s .3s opacity;
          opacity: .1;
          > img {
            width: 40px;
            height: 40px;
            border-radius: 5px;
          }
          .info {
            > h3 {
              color: #14171a;
              font-size: 18px;
              font-weight: 700;
            }
            > p {
              color: #FF705F;
              font-size: 12px;
              white-space: nowrap;
            }
          }
        }
        &.mini {
          padding-top: 0;
          .profile-mini {
            opacity: 1;
          }
        }
      }
      nav {
        display: flex;
        padding-left: 5.6%;
        .nav-link {
          display: block;
          min-width: 64px;
          height: 60px;
          transition: .4s;
          text-align: center;
          border-bottom: 1px solid transparent;
          &:nth-child(1) {
            &.active {
              border-bottom: 4px solid transparent;
            }
          }
          &.active {
            border-bottom: 4px solid #ff9f71;
          }
          &:hover {
            border-bottom: 4px solid #ffbb9d;
          }
          > span {
            display: block;
            position: relative;
            margin: 20px;
            color: #2e2f2f;
            white-space: nowrap;
            &.new::after {
              content: 'new';
              display: block;
              position: absolute;
              right: -10px;
              top: -80%;
              font-size: 12px;
              color: #ff9f71;
              border: 1px solid #ff9f71;
              border-radius: 5px;
              padding: 0 3px;
              height: 16px;
              line-height: 12px;
            }
          }
        }
      }
    }
  }
</style>
