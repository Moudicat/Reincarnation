<template>
  <div id="app">
    <Sidebar id="sidebar"/>
    <div id="main-container">
      <Navbar/>
      <MainSection/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Sidebar from 'views/layout/sidebar';
  import Navbar from 'views/layout/navbar';
  import MainSection from 'views/layout/main';

  export default {
    components: {
      Sidebar,
      Navbar,
      MainSection
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import url('../../../static/css/reset.css');

  html, body {
    height: 100%;
  }

  #app {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: PingFang SC, RobotoDraft, Roboto, Helvetica Neue, Helvetica, Arial, STHeiti, 华文黑体, Microsoft YaHei, 微软雅黑, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    background-color: #efeff4;
    color: #2c3e50;
  }

  #sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    z-index: 2;
  }

  #main-container {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
    padding-left: 200px;
  }
</style>
