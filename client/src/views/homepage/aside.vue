<template>
  <aside>
    <StatusPanel />
  </aside>
</template>

<script type="text/ecmascript-6">
  import StatusPanel from 'views/status-panel';

  export default {
    components: {
      StatusPanel
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  aside {
    flex: 0 0 25.2%;
    margin: 45px 10px 5px 0;
  }
</style>
