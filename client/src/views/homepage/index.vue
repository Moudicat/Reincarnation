<template>
  <section class="homepage-wrapper">
    <r-aside />
    <ArticleList />
  </section>
</template>

<script type="text/ecmascript-6">
  import Aside from 'views/homepage/aside';
  import ArticleList from 'views/homepage/articleList';

  export default {
    components: {
      rAside: Aside,
      ArticleList
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .homepage-wrapper {
    display: flex;
    justify-content: space-around;
    flex: auto;
    width: 100%;
    max-width: 1190px;
    margin: 0 auto;
  }
</style>
