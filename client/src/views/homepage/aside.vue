<template>
  <transition-group name="component-fade" tag="aside">
    <StatusPanel v-if="asideAnimationIndex >= 0" key="statusPanel"/>
    <BangumiPanel v-if="asideAnimationIndex >= 1" key="bangumiPanel"/>
    <BililivePanel v-if="asideAnimationIndex >= 2" key="bililivePanel"/>
    <!-- <WakatimePanel v-if="asideAnimationIndex >= 3" key="wakatimePanel"/> -->
  </transition-group>
</template>

<script type="text/ecmascript-6">
  import StatusPanel from 'components/status-panel';
  import BangumiPanel from 'components/bangumi-panel';
  import WeatherPanel from 'components/weather-panel';
  import BililivePanel from 'components/bililive-panel';
  import WakatimePanel from 'components/wakatime-panel';

  export default {
    components: {
      StatusPanel,
      BangumiPanel,
      WeatherPanel,
      BililivePanel,
      WakatimePanel
    },
    data() {
      return {
        asideAnimationIndex: -1
      };
    },
    mounted() {
      let animationIndexTimer = setInterval(() => {
        this.asideAnimationIndex++;
        if (this.asideAnimationIndex >= 3) {
          clearInterval(animationIndexTimer);
        }
      }, 250);
    }

  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  aside {
    flex: 0 0 280px;
    margin: 10px 10px 5px 0;
    div:nth-child(n) {
      margin-bottom: 10px;
    }
  }
</style>
