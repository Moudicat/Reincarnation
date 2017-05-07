<template>
  <transition name="fly">
    <section>
      <div class="pic-404"></div>
      <h5>404 您所访问的页面不存在</h5>
    </section>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  section {
    display: flex;
    flex: 1;
    padding: 50px 15% 50px 30%;
    width: 100%;
    background: #f2ccc4;
    .pic-404 {
      flex: 0 0 45%;
      background: url('./img/cat_with_mouse.svg') no-repeat;
      background-size: contain;
    }
    h5 {
      flex: auto;
      font-size: 38px;
      color: rgba(255, 255, 255, .7);
      text-shadow: 1px 1px 1px #d3d7dc;
    }
  }
  .fly-enter-active, .fly-leave-active {
    transition: .5s;
  }
  .fly-enter, .fly-leave-active {
    transform: translateX(-100%);
  }
</style>
