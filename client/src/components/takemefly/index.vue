<template>
  <div class="take-me-fly" :class="{show: takeMeFlyState}" @click="takeMeFly"></div>
</template>

<script type="text/ecmascript-6">
  export default {
    computed: {
      takeMeFlyState() {
        return this.$store.state.components.takeMeFlyState;
      }
    },
    methods: {
      takeMeFly() {
        const body = document.body;
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        const top = () => {
          scrollTop = scrollTop + (-scrollTop) / 6;
          if (scrollTop < 1) {
            body.scrollTop = 0;
            return;
          }
          body.scrollTop = document.documentElement.scrollTop = scrollTop;
          requestAnimationFrame(top);
        };
        top();
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
