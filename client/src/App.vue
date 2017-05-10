<template>
  <div id="app">
    <r-header/>
    <keep-alive exclude="Article">
      <router-view/>
    </keep-alive>
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
    }
  };
</script>

<style>
  #app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background-color: #f5f8fa;
  }

  *, *::after, *::before {
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 0;
  }

  /*::-webkit-scrollbar-thumb {*/
  /*border-radius: 8px;*/
  /*background-color: rgba(0, 0, 0, .3);*/
  /*}*/
</style>
