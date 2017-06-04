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
            version: '0.1.2',
            date: '2017-06-05',
            desc: '添加 番剧列表接入api 番剧查询添加'
          },
          {
            version: '0.1.0',
            date: '2017-05-29',
            desc: '强行上线_(:з」∠)_'
          },
          {
            version: '0.0.13',
            date: '2017-05-26',
            desc: '添加 天气系统接入api 采用 history api'
          },
          {
            version: '0.0.12',
            date: '2017-05-25',
            desc: '添加 一些细小的动画，状态板接入api'
          },
          {
            version: '0.0.11',
            date: '2017-05-25',
            desc: '添加 文章内容部分，markdown解析'
          },
          {
            version: '0.0.10',
            date: '2017-05-24',
            desc: '调试 文章区域接入api'
          },
          {
            version: '0.0.9',
            date: '2017-05-23',
            desc: '改进 部署流程 | 添加 进度条 天气模块'
          },
          {
            version: '0.0.8',
            date: '2017-05-22',
            desc: '初始化 后台管理页面 | 添加 文章管理功能'
          },
          {
            version: '0.0.7',
            date: '2017-05-16',
            desc: 'Make api works'
          },
          {
            version: '0.0.6',
            date: '2017-05-11',
            desc: '添加 hitokoto api | 使用 fetch'
          },
          {
            version: '0.0.5',
            date: '2017-05-10',
            desc: '添加 article(demo)组件 修复 bug'
          },
          {
            version: '0.0.4',
            date: '2017-05-09',
            desc: '添加 bangumi/Aplayer组件'
          },
          {
            version: '0.0.3',
            date: '2017-05-08',
            desc: '添加 about/status-panel/tag组件'
          },
          {
            version: '0.0.2',
            date: '2017-05-06',
            desc: '添加 header/footer/homepage组件'
          },
          {
            version: '0.0.1',
            date: '2017-05-04',
            desc: '工程建立'
          }
        ]
      };
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
