<template>
  <section class="layout-wrapper">
    <aside class="layout-aside" v-if="hasAside">
      <slot name="aside"></slot>
    </aside>
    <div class="layout-content" :class="{'center': !hasAside}">
      <slot name="content"></slot>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      hasAside: {
        default: false,
        type: Boolean
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .layout-wrapper {
    position: relative;
    z-index: 800;
    display: flex;
    flex: auto;
    width: 100%;
    max-width: 1190px;
    margin: 0 auto;
    .layout-aside {
      flex: 0 0 25.2%;
      margin: 10px 10px 5px 0;
    }
    .layout-content {
      margin: 10px 0 5px 5px;
      flex: 1;
      max-width: 73.6%;
      &.center {
        margin: 10px auto;
      }
    }
  }
</style>
