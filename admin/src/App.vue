<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'app',
    beforeMount() {
      global.Store = this.$store;
      this.$store.dispatch('init');
    }
  };
</script>

<style>
  *, *:before, *:after {
    box-sizing: border-box;
  }
</style>
