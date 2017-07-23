<template>
  <span :class="type" class="tag">
    <slot />
   <span class="numb" v-if="typeof num === 'number'">{{num}}</span>
  </span>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      type: String,
      num: {
        type: Number,
        default: null
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .tag {
    display: inline-block;
    padding: 0 5px;
    height: 24px;
    line-height: 22px;
    font-size: 12px;
    color: #fff;
    background-color: #8391a5;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid transparent;
    white-space: nowrap;
    .numb {
      padding: 0 4px;
      border-radius: 50%;
      background-color: #fff;
    }
  }

  .gray {
    background-color: #e4e8f1;
    border-color: #e4e8f1;
    color: #48576a;
    > * {
      color: #48576a;
    }
  }
  .blue {
    background-color: rgba(32,160,255,.1);
    border-color: rgba(32,160,255,.2);
    color: #20a0ff;
    > * {
      color: #20a0ff;
    }
  }
  .green {
    background-color: rgba(18,206,102,.1);
    border-color: rgba(18,206,102,.2);
    color: #13ce66;
    > * {
      color: #13ce66;
    }
  }
  .orange {
    background-color: rgba(247,186,41,.1);
    border-color: rgba(247,186,41,.2);
    color: #f7ba2a;
    > * {
      color: #f7ba2a;
    }
  }
  .red {
    background-color: rgba(255,73,73,.1);
    border-color: rgba(255,73,73,.2);
    color: #ff4949;
    > * {
      color: #ff4949;
    }
  }
</style>
