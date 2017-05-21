<template>
  <router-view id="content"></router-view>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  #content {
    flex: 1 1 auto;
    padding: 40px;
    min-width: 1000px;
    overflow-y: auto;
  }
</style>
