<template>
  <section class="homepage-wrapper">
    <r-aside />
    <div class="article-list-wrapper">
      article-list~~
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import Aside from 'views/homepage/aside';

  export default {
    components: {
      rAside: Aside
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

    .article-list-wrapper {
      flex: auto;
      margin: 10px 5px 5px;
      border: 1px solid red;
      height: 800px;
    }
  }
</style>
