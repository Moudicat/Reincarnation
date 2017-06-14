<template>
  <router-view></router-view>
</template>

<script>
  import Article from 'services/article';

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
      } else {
        Article.listAll()
          .then(() => {})
          .catch(err => {
            console.log(err.message);
            if (err.message === '401') {
              this.$message.error('登录超时！');
              this.$store.dispatch('logout')
                .then(() => {
                  this.$router.push('/login');
                });
            } else {
              this.$message.error(err.message);
            }
          });
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
    margin-top: 20px !important;
  }
</style>
