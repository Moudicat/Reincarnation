<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'app',
    beforeMount() {
      global.Store = this.$store;
      this.$store.dispatch('init');
    },
    mounted() {
      if (!this.$store.state.token) {
        alert('未登录！');
        this.$router.push('/login');
      }
    }
  };
</script>

<style>
  *, *:before, *:after {
    box-sizing: border-box;
  }
  .padding-top {
    padding-top: 20px;
  }
  .margin-top {
    margin-top: 20px;
  }
</style>
