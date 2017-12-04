<template>
  <div id="app">
    <r-header/>
    <transition name="fade" mode="out-in">
      <keep-alive exclude="Article">
        <router-view v-if="$store.state.global.isLoaded"/>
      </keep-alive>
    </transition>
    <r-footer v-if="$store.state.global.isLoaded"/>
  </div>
</template>

<script>
  import '../static/responsive.scss';
  import Header from 'views/header';
  import Footer from 'views/footer';
  import pkg from '../package.json';

  export default {
    name: 'app',
    components: {
      rHeader: Header,
      rFooter: Footer
    },
    data() {
      return {
        ws: null,
        wsTimer: null
      };
    },

    methods: {
      init() {
        window.__version__ = pkg.version.split('.').map(e => Number(e));
      },

      closeLoader() {
        setTimeout(() => {
          let path = 'M40,30 c 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 Z';
          document.getElementById('path').setAttribute('d', path);
          document.getElementById('loader-t').style.opacity = 0;
          setTimeout(() => {
            document.body.removeChild(document.getElementById('loader'));
            this.$event.$emit('loaded');
            this.$store.commit('global/SET_ISLOADED', true);
          }, 600);
        }, 2000);
      },

      initWSS() {
        if (window.WebSocket) {
          this.ws = new WebSocket('wss://moudicat.com:2333');

          this.ws.onopen = (evt) => {
          //  console.log('[open]');
            clearInterval(this.wsTimer);
            this.wsTimer = setInterval(() => {
              this.ws.send('');
            }, 30000);
          };

          this.ws.onmessage = (evt) => {
          //  console.log(`message: ${evt.data}`);
          };

          this.ws.onclose = (evt) => {
            clearInterval(this.wsTimer);
          };
        } else {
          console.log('[WebSocket] 不支持');
        }
      }
    },

    mounted() {
      this.init();
      this.initWSS();
      this.closeLoader();
    }
  };
</script>

<style lang="scss">
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-width: 1080px;
    font-family: "Roboto", "PingFang SC", "Microsoft YaHei", Helvetica, "宋体", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f5f8fa;
    color: $secondary-text;
  }

  .padding-top {
    padding-top: 10px;
  }

  .margin-top {
    margin-top: 10px;
  }

  .padding-in {
    padding: 20px !important;
  }

  .fade-enter-active, .fade-leave-active {
    transition: .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translate3d(20px, 0, 0);
  }

  .fade-top-enter-active, .fade-top-leave-active {
    transition: 1s;
  }

  .fade-top-enter, .fade-top-leave-to {
    opacity: 0;
    transform: translate3d(0, -30px, 0);
  }

  .component-fade-enter-active, .component-fade-leave-active {
    transition: .6s;
  }

  .component-fade-enter, .component-fade-leave-to {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }

  .message-box-wrapper-enter-active, .message-box-wrapper-leave-active {
    transition: .3s;
  }

  .message-box-wrapper-enter, .message-box-wrapper-leave-to {
    opacity: 0;
  }

  .message-box-enter-active, .message-box-leave-active {
    transition: .3s;
  }

  .message-box-enter, .message-box-leave-to {
    transform: translate3d(0, -20px, 0) scale(1.05);
  }

  .message-enter-active, .message-leave-active {
    transition: .4s;
  }

  .message-enter, .message-leave-to {
    opacity: 0;
    transform: translate3d(0, -20px, 0);
  }
</style>

<style>

</style>
