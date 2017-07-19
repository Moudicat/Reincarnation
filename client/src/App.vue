<template>
  <div id="app">
    <r-header/>
    <transition name="fade">
      <keep-alive exclude="Article">
        <router-view/>
      </keep-alive>
    </transition>
    <r-footer/>
  </div>
</template>

<script>
  import Header from 'views/header';
  import Footer from 'views/footer';

  export default {
    name: 'app',
    components: {
      rHeader: Header,
      rFooter: Footer
    },
    mounted() {
      setTimeout(() => {
        let path = 'M40,30 c 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 Z';
        document.getElementById('path').setAttribute('d', path);
        document.getElementById('loader-t').style.opacity = 0;
        setTimeout(() => {
          document.body.removeChild(document.getElementById('loader'));
          this.$message({
            type: 'warning',
            message: '本站ServiceWorker处于试运行阶段，若发现任何问题，请刷新页面或在控制台注销',
            duration: 7000
          });
        }, 600);
      }, 2000);
    }
  };
</script>

<style>
  #app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    min-width: 1080px;
    font-family: "PingFang SC", "Microsoft YaHei", Helvetica, "宋体", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background-color: #f5f8fa;
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

  .fade-enter-active {
    transition: .5s;
  }
  .fade-enter, .fade-leave-to  {
    opacity: 0
  }

  .message-box-wrapper-enter-active, .message-box-wrapper-leave-active {
    transition: .3s;
  }
  .message-box-wrapper-enter, .message-box-wrapper-leave-to  {
    opacity: 0;
  }

  .message-box-enter-active, .message-box-leave-active {
    transition: .3s;
  }
  .message-box-enter, .message-box-leave-to  {
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
