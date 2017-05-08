<template>
  <div class="about-page">
    <h4>Time Line</h4>
    <TimeLineTable />
  </div>
</template>

<script type="text/ecmascript-6">
  import TimeLineTable from 'components/timeLineTable';

  export default {
    components: {
      TimeLineTable
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .about-page {
    background-color: #fff;
    border: 1px solid #e6ecf0;
  }
  h4 {
    margin: 20px 0 20px;
    font-size: 28px;
    font-weight: 700;
    text-align: center;
  }
</style>
