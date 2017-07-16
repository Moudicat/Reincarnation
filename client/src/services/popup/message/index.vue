<template>
  <div class="message-wrapper">
    <transition name="message">
      <div class="message" :class="type" v-show="visibility">
        <div class="message-img"></div>
        {{ message }}
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'message',
    data() {
      return {
        type: 'info',
        visibility: false,
        message: '常用于主动操作后的反馈提示。',
        timer: null,
        duration: 3000
      };
    },
    methods: {
      handleDestroy() {
        this.visibility = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
      },
      destroyElement() {
        this.$el.removeEventListener('transitionend', this.destroyElement);
        this.$destroy();
        this.$el.parentNode.removeChild(this.$el);
      }
    },
    mounted() {
      this.visibility = true;
      this.timer = setTimeout(this.handleDestroy, this.duration);
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  .message-wrapper {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    text-align: center;
    .message {
      position: relative;
      display: inline-block;
      min-width: 300px;
      height: 50px;
      line-height: 50px;
      background-color: #fff;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.11), 2px 2px 7px 1px rgba(0, 0, 0, 0.27);
      overflow: hidden;
      .message-img {
        position: absolute;
        top: 0;
        left: 0;
        height: 0;
        width: 0;
        border: 10px solid #57c5ff;
        border-right-color: transparent;
        border-bottom-color: transparent;
      }

      &.success {
        .message-img {
          border-color: #9aff8f;
          border-right-color: transparent;
          border-bottom-color: transparent;
        }
      }
      &.warning {
        .message-img {
          border-color: #ff874e;
          border-right-color: transparent;
          border-bottom-color: transparent;
        }
      }
      &.error {
        .message-img {
          border-color: #ff423c;
          border-right-color: transparent;
          border-bottom-color: transparent;
        }
      }
    }
  }

</style>
