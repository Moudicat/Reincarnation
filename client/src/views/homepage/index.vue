<template>
  <section class="homepage-wrapper">
    <r-aside />
    <ArticleList />
    <Takemefly />
  </section>
</template>

<script type="text/ecmascript-6">
  import Aside from 'views/homepage/aside';
  import ArticleList from 'views/homepage/articleList';
  import Takemefly from 'components/takemefly';

  export default {
    components: {
      rAside: Aside,
      ArticleList,
      Takemefly
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .homepage-wrapper {
    display: flex;
    justify-content: space-around;
    flex: auto;
    width: 100%;
    min-width: 1190px;
    max-width: 1400px;
    margin: 0 auto;
  }
</style>
