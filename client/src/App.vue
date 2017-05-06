<template>
  <div id="app">
    <r-header/>
    <router-view/>
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
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #f5f8fa;
  }
  *, *::after, *::before {
    box-sizing: border-box;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: rgba(0,0,0,.2);
  }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-track {
    border-right: 1px solid transparent;
    border-left: 1px solid transparent;
  }
</style>
