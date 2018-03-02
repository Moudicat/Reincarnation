<template>
  <section class="layout-wrapper">
    <aside class="layout-aside" v-if="hasAside">
      <slot name="aside"></slot>
    </aside>
    <div class="layout-content" :class="{'center': !hasAside, 'full': isFullScreen}">
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
      },
      isFullScreen: {
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
    flex: 1;
    width: 100%;
    min-width: 900px;
    max-width: 1300px;
    margin: 0 auto;
    .layout-aside {
      flex: 0 0 200px;
      margin: 10px 10px 5px 0;
    }
    .layout-content {
      margin: 10px 0 5px 5px;
      flex: 1;
      &.full {
        max-width: 100%;
      }
      &.center {
        margin: 10px auto;
      }
    }
  }
</style>
