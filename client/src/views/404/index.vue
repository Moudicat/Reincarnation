<template>
  <section>
    <div class="pic-404"></div>
    <h5>404 页面不存在</h5>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  section {
    display: flex;
    flex: 1 1 320px;
    padding: 50px 15% 50px 30%;
    width: 100%;
    background: #f2ccc4;
    .pic-404 {
      flex: 0 0 45%;
      width: 45%;
      background: url('./img/cat_with_mouse.svg') no-repeat;
      background-size: 100% 100%;
    }
    h5 {
      flex: auto;
      font-size: 38px;
      color: rgba(255, 255, 255, .7);
      text-shadow: 1px 1px 1px #d3d7dc;
    }
  }
</style>
