<template>
  <transition name="message-box-wrapper">
    <div class="message-box-wrapper" v-show="visibility">
      <transition name="message-box">
        <div class="message-box" :class="className" v-show="visibility">
          <div class="header">
            <div class="title">{{ title }}</div>
            <button class="close" @click="handleClose" v-show="showClose">x</button>
          </div>
          <div class="content">
            {{ message }}
          </div>
          <div class="btns">
            <button class="confirm" @click="handleConfirm">{{confirmText}}</button>
            <button class="cancel" @click="handleCancel" v-show="type === 'confirm'">{{cancelText}}</button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'messageBox',
    data() {
      return {
        type: 'info',
        visibility: false,
        title: '提示',
        showClose: false,
        message: '模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、成功提示、错误提示、询问信息。当用户进行操作时会被触发，该对话框中断用户操作，直到用户确认知晓后才可关闭。',
        confirmText: '确认',
        cancelText: '取消'
      };
    },
    methods: {
      handleClose() {
        if (typeof this.resolve === 'function') {
          this.resolve();
        }
        this.visibility = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
      },
      handleConfirm() {
        if (typeof this.resolve === 'function') {
          this.resolve();
        }
        this.visibility = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
      },
      handleCancel() {
        if (typeof this.reject === 'function') {
          this.reject();
        }
        this.visibility = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
      },
      destroyElement() {
        this.$el.removeEventListener('transitionend', this.destroyElement);
        this.$destroy();
        this.$el.parentNode.removeChild(this.$el);
      }
    },
    computed: {
      className() {
        return this.type;
      }
    },
    mounted() {
      this.visibility = true;
      document.body.style.overflowY = 'hidden';
    },
    destroyed() {
      document.body.style.overflowY = '';
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  .message-box-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    backface-visibility: hidden;
    background-color: rgba(0, 0, 0, .4);
    &::after {
      content: '';
      display: inline-block;
      width: 0;
      height: 100%;
      vertical-align: middle;
    }
    .message-box {
      display: inline-block;
      width: 420px;
      border-radius: 4px;
      font-size: 18px;
      background-color: #fff;
      text-align: left;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.11), 5px 1px 15px 3px rgba(0, 0, 0, 0.04);
      backface-visibility: hidden;
      .header {
        position: relative;
        color: #000;
        padding: 15px 20px 0 20px;
        .title {
          padding-left: 10px;
          border-left: 3px solid #43c3ff;
        }
        .close {
          position: absolute;
          right: 18px;
          top: 12px;
          font-size: 18px;
        }
      }

      .content {
        padding: 20px 25px;
        font-size: 16px;
      }

      .btns {
        padding: 0 20px;
        text-align: right;
        button {
          padding: 10px 20px;
          border-radius: 2px 2px 0 0;
          font-size: 14px;
          transition: .4s;
          cursor: pointer;
        }
        .confirm {
          &:hover {
            background-color: #79d1ff;
          }
        }
        .cancel {
          &:hover {
            background-color: #ff908e;
          }
        }
      }
      &.alert {
        .header {
          .title {
            border-color: #ff6352;
          }
        }
      }
      &.confirm {
        .header {
          .title {
            border-color: #ffa94f;
          }
        }
      }
    }
  }

</style>
