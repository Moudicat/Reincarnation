<template>
  <el-table :data="releaseData" width="100%">
    <el-table-column prop="version" label="版本" width="150"></el-table-column>
    <el-table-column prop="date" label="日期" width="180"></el-table-column>
    <el-table-column prop="desc" label="说明"></el-table-column>
  </el-table>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        releaseData: [
          {
            version: '0.0.5',
            date: '2017-05-10',
            desc: 'Add article(demo) | fixed bugs'
          },
          {
            version: '0.0.4',
            date: '2017-05-09',
            desc: 'Add bangumi/Aplayer'
          },
          {
            version: '0.0.3',
            date: '2017-05-08',
            desc: 'Add about/status-panel/tag'
          },
          {
            version: '0.0.2',
            date: '2017-05-06',
            desc: 'Add header/footer/homepage'
          },
          {
            version: '0.0.1',
            date: '2017-05-04',
            desc: 'Initial commit'
          }
        ]
      };
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
