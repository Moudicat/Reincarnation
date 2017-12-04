<template>
  <div class="take-me-fly" :class="{show: takeMeFlyState}" @click="takeMeFly"></div>
</template>

<script type="text/ecmascript-6">
  import { scrollToTop } from 'services/utils';

  export default {
    computed: {
      takeMeFlyState() {
        return this.$store.state.components.takeMeFlyState;
      }
    },
    methods: {
      takeMeFly() {
        scrollToTop();
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .take-me-fly {
    position: fixed;
    z-index: 999;
    left: 70px;
    bottom: -100%;
    width: 160px;
    height: 100px;
    background: url(./img/cat_with_fish.svg) no-repeat;
    background-size: 100% 100%;
    opacity: 0;
    transition: .4s .2s;
    &.show {
      opacity: 1;
      bottom: 40px;
    }
  }
</style>
