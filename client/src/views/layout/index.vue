<template>
  <section class="layout-wrapper">
    <aside class="layout-aside">
      <slot name="aside"></slot>
    </aside>
    <div class="layout-content">
      <slot name="content"></slot>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .layout-wrapper {
    display: flex;
    flex: auto;
    width: 100%;
    max-width: 1190px;
    margin: 0 auto;
    .layout-aside {
      flex: 0 0 25.2%;
      margin: 45px 10px 5px 0;
    }
    .layout-content {
      margin: 10px 0 5px 5px;
      flex: 1;
      max-width: 73.6%;
    }
  }
</style>
