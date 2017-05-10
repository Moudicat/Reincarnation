<template>
  <article>
    article
  </article>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Article',
    mounted() {
      this.$store.commit('header/SET_AVATAR', true);
    },
    beforeDestroy() {
      this.$store.commit('header/SET_AVATAR', false);
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  article {
    flex: 1;
    width: 100%;
    max-width: 1190px;
    margin: 20px auto;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 0 0 1px #d1d1d1, 0 0 3px 2px #ccc;
  }
</style>
