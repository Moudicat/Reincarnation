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
  import SStorage from 'services/sstorage';

  export default {
    name: 'app',
    components: {
      rHeader: Header,
      rFooter: Footer
    },
    data() {
      return {
        versionCode: '',
        MAX_RETRY: 1,
        ws: null
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
          };

          this.ws.onmessage = (evt) => {
          //  console.log(`message: ${evt.data}`);
          };

          this.ws.onclose = (evt) => {
          //  console.log('[close]');
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
    },

    computed: {
      version() {
        return this.$store.state.global.status.filter(e => e.name === '当前博客版本');
      }
    },

    watch: {
      version(newValue) {
        newValue = newValue[0].content;
        if (newValue) {
          let nowVersion = newValue.split('@')[1].split('.').map(e => Number(e));

          console.log(`%c当前版本号：${nowVersion.join('.')}, 最新版本号: ${window.__version__.join('.')}`, 'color: red');

          if (nowVersion[0] > window.__version__[0] || nowVersion[1] > window.__version__[1] || nowVersion[2] > window.__version__[2]) {
            if (SStorage.get('updateRetry')) {
              let retry = SStorage.get('updateRetry');
              if (retry.targetVersion === nowVersion.join('') && retry.count >= this.MAX_RETRY) {
                this.$message({
                  type: 'error',
                  message: '更新失败，已禁用自动更新系统'
                });
                return;
              }
              SStorage.set('updateRetry', {
                count: retry.count + 1,
                targetVersion: nowVersion.join('')
              });
            } else {
              this.$message({
                message: '当前版本低于服务端版本，5秒后自动更新...',
                duration: 4500
              });
              SStorage.set('updateRetry', {
                count: 1,
                targetVersion: nowVersion.join('')
              });
            }
            setTimeout(() => {
              location.reload();
            }, 5000);
          }
        }
      }
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
