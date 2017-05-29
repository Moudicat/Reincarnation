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
      let path = 'M40,30 c 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 Z';
      document.getElementById('path').setAttribute('d', path);
      document.getElementById('loader-t').style.opacity = 0;
      setTimeout(() => {
        document.body.removeChild(document.getElementById('loader'));
      }, 600);
    }
  };
</script>

<style>
  #app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    font-family: Helvetica, "PingFang SC", "Microsoft YaHei", "微软雅黑", "宋体", sans-serif;
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

  .fade-leave, .fade-enter-active {
    transition: all .7s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
