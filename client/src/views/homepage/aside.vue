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
    margin: 45px 10px 5px 0;
  }
  .aplayer-test {
    position: relative;
    padding: 20px 0;
    margin-top: 10px;
    border: 1px solid #d1dbe5;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .11), 0 0 4px 0 rgba(0, 0, 0, .04);
  }
</style>
