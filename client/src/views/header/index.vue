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
              <img :src="avatarUrl" alt="avatar">
            </div>
            <div class="profile-mini-wrapper" :class="{mini: miniAvatarState}">
              <div class="profile-mini">
                <img :src="avatarUrl"
                     alt="mini-avatar">
                <div class="info">
                  <h3>结束与起始之界</h3>
                  <p>More cooperation, no competition.</p>
                </div>
              </div>
            </div>
            <transition-group name="component-fade" tag="nav">
              <router-link :to="nav.link" class="nav-link" v-for="(nav, index) in navMap" :key="index" v-if="navAnimationIndex >= index">
                <span>{{ nav.name }}</span>
              </router-link>
            </transition-group>
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
  import Star from 'services/weatherSystem/Star';
  import Fireflies from 'services/weatherSystem/Fireflies';
  import { supportWebp } from 'services/utils';

  export default {
    data() {
      return {
        hitokoto: '',
        navMap: [{
          link: '/',
          name: '文章'
        }, {
          link: '/animation',
          name: '番剧列表'
        }, {
          link: '/links',
          name: '友情链接'
        }, {
          link: '/memobird',
          name: '递小纸条'
        }, {
          link: '/about',
          name: '关于本站'
        }],
        navAnimationIndex: -1
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
            weather = new Rain(false);
            weather.init();
            break;
          case 'heavyRain':
            weather = new Rain(true);
            weather.init();
            break;
          case 'star':
            weather = new Star();
            weather.init();
            break;
          case 'fireflies':
            weather = new Fireflies();
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
      avatarUrl() {
        let isWebp = '';
        if (supportWebp()) {
          isWebp = '?x-oss-process=style/webp';
        }
        return this.$store.state.header.avatarUrl + isWebp;
      },
      backgroundUrl() { // 'url(' + require('../assets/images/1.jpg') + ')'
        if (!this.$store.state.global.bgUrl) {
          return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAIAAAEYqUiJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHZJREFUeNpi+P37N0AAMfz9+xcggBh+/vz58uVLgABiBOH///8DBBDD8+fPgTL//v0DCCDGP3/+AFlfvnxhYmBg+PbtGy8vL1T2169fAAE6moMbAIAQBIL0X6nBDu51E30grhij7S4VQ2lgd23f1cxExMYLA8R/7Uth/ofXN50AAAAASUVORK5CYII=`;
        }
        let isWebp = '';
        if (supportWebp()) {
          isWebp = '?x-oss-process=style/webp';
        }
        return `url('https://moudicat-data.oss-cn-beijing.aliyuncs.com/cdn/images/banner/${this.$store.state.global.bgUrl}.png${isWebp}') center center`;
      }
    },
    beforeMount() {
      Hitokoto.get().then(response => {
        let hitokoto = response.data.content;
        let typingAnimation = () => {
          this.hitokoto += hitokoto.substring(0, 1);
          hitokoto = hitokoto.substring(1);
          if (hitokoto.length !== 0) {
            setTimeout(typingAnimation, Math.random() * 100 + 40);
          } else {
            hitokoto = typingAnimation = null;
          }
        };

        this.$event.$on('loaded', () => {
          typingAnimation();
          let animationIndexTimer = setInterval(() => {
            this.navAnimationIndex++;
            if (this.navAnimationIndex >= this.navMap.length) {
              clearInterval(animationIndexTimer);
            }
          }, 200);
        });
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
      box-shadow: $secondary-boxshadow;
      background-color: $primary-background;
    }
    .nav-container {
      display: flex;
      position: relative;
      height: 60px;
      min-width: 1190px;
      max-width: 1400px;
      margin: 0 auto;
      background-color: $primary-background;
      .avatar-wrapper {
        position: absolute;
        top: -90px;
        left: 30px;
        z-index: 1001;
        width: 150px;
        height: 150px;
        border-radius: 12px;
        box-shadow: 0 1px 1px rgba(136, 153, 166, 0.15);
        overflow: hidden;
        transition: .6s;
        user-select: none;
        > img {
          width: 150px;
          height: 150px;
        }
        &.mini {
          height: 0;
          opacity: 0;
        }
      }
      .profile-mini-wrapper {
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
            margin-right: 10px;
            border-radius: 5px;
          }
          .info {
            > h3 {
              color: #14171a;
              font-size: 18px;
              font-weight: 400;
            }
            > p {
              color: $secondary-text;
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
        user-select: none;
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
              span {
                color: $secondary-text;
              }
            }
          }
          &.active {
            border-bottom: 4px solid $primary-divider-color;
            span {
              color: $primary-text;
            }
          }
          &:hover {
            border-bottom: 4px solid $divider-color;
            span {
              color: $primary-text;
            }
          }
          > span {
            display: block;
            position: relative;
            margin: 20px;
            color: $secondary-text;
            white-space: nowrap;
            &.new::after {
              content: 'new';
              display: block;
              position: absolute;
              right: -10px;
              top: -80%;
              font-size: 12px;
              color: $divider-color;
              border: 1px solid $divider-color;
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
