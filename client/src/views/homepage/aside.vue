<template>
  <aside>
    <StatusPanel />
    <BangumiPanel />
  </aside>
</template>

<script type="text/ecmascript-6">
  import StatusPanel from 'components/status-panel';
  import BangumiPanel from 'components/bangumi-panel';
  import WeatherPanel from 'components/weather-panel';

  export default {
    components: {
      StatusPanel,
      BangumiPanel,
      WeatherPanel
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  aside {
    flex: 0 0 25.2%;
    margin: 10px 10px 5px 0;
  }
</style>
