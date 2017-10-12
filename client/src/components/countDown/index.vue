<template>
  <div class="countdown-wrapper">
    <div class="countdown" :class="size">
      <div class="countdown-sidebar">
        <span class="active" href="javascript:;">M.1</span>
        <span href="javascript:;">M.2</span>
        <span href="javascript:;">M.3</span>
      </div>
      <div class="countdown-main">
        <div class="countdown-header">
          <span class="countdown-header-icon">😶</span>
          倒计时还有：
        </div>
        <div class="countdown-timer">
          <span class="number">348</span>
          <span class="text">天</span>

          <span class="number">12</span>
          <span class="text">时</span>

          <span class="number">30</span>
          <span class="text">分</span>

          <span class="number">23</span>
          <span class="text">秒</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      size: {
        default: 'normal',
        type: String
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .countdown-wrapper {
    background: #fff;
    .countdown {
      display: flex;
      width: 100%;
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      .countdown-sidebar {
        display: flex;
        flex: 0;
        flex-direction: column;
        justify-content: space-around;
        border-right: 1px solid #eee;
        .active {
          background-color: #606060;
          color: #fff;
        }
        span {
          display: block;
          padding: 4px 6px;
          border-bottom: 1px solid #eee;
          text-decoration: none;
          color: #111;
          cursor: pointer;
          &:nth-last-of-type(1) {
            border-bottom: none;
          }
        }
      }

      .countdown-main {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 0 10px;
        .countdown-header {
          flex: 0;
          padding: 5px 0;
          border-bottom: 1px solid #eee;
        }
        .countdown-timer {
          display: flex;
          flex: 1;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          user-select: none;
          .number {
            color: #C21F39;
          }
          .text {
            color: #a1a1a1;
          }
        }
      }
    }
  }


  .countdown.normal {
    .countdown-timer {
      .number {
        font-size: 32px;
      }
      .text {
        margin: 10px 8px 0 0;
      }
    }
  }

  .countdown.small {
    .countdown-timer {
      .number {
        font-size: 24px;
      }
      .text {
        margin: 4px 8px 0 0;
      }
    }
  }

</style>
