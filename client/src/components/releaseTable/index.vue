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
            version: '0.7.0',
            date: '2017-11-27',
            desc: '调整 UI及动效 更新/升级 全线依赖 添加 WebSocket支持 修复 咕咕机bug'
          },
          {
            version: '0.6.10',
            date: '2017-11-20',
            desc: '调整 自适应宽度'
          },
          {
            version: '0.6.9',
            date: '2017-11-20',
            desc: '添加 markdown设置'
          },
          {
            version: '0.6.8',
            date: '2017-10-30',
            desc: '添加 基础节日系统 优化 用户界面'
          },
          {
            version: '0.6.6',
            date: '2017-10-27',
            desc: '优化 用户界面 修复 bug'
          },
          {
            version: '0.6.5',
            date: '2017-10-12',
            desc: '优化 用户界面 修复 bug'
          },
          {
            version: '0.6.4',
            date: '2017-09-25',
            desc: '修复 分页总数显示异常'
          },
          {
            version: '0.6.3',
            date: '2017-09-18',
            desc: '修复 天气系统bug'
          },
          {
            version: '0.6.2',
            date: '2017-09-15',
            desc: '优化 前端界面'
          },
          {
            version: '0.6.1',
            date: '2017-09-13',
            desc: '优化 前端界面 修复 天气系统(下雨)中的bug'
          },
          {
            version: '0.6.0',
            date: '2017-09-11',
            desc: '休整服务器 后端重构'
          },
          {
            version: '0.5.9',
            date: '2017-08-24',
            desc: '修改 部分响应式、文章区'
          },
          {
            version: '0.5.7',
            date: '2017-08-10',
            desc: '修改 版本号'
          },
          {
            version: '0.5.5',
            date: '2017-08-10',
            desc: '添加 自动更新功能'
          },
          {
            version: '0.5.4',
            date: '2017-08-06',
            desc: '修复 页面过渡效果'
          },
          {
            version: '0.5.3',
            date: '2017-07-31',
            desc: '添加 主题系统Part 3'
          },
          {
            version: '0.5.2',
            date: '2017-07-30',
            desc: '添加 主题系统Part 2'
          },
          {
            version: '0.5.1',
            date: '2017-07-26',
            desc: '修复⛏  bug'
          },
          {
            version: '0.5.0',
            date: '2017-07-23',
            desc: '添加 移动端适配+PWA'
          },
          {
            version: '0.4.0',
            date: '2017-07-19',
            desc: '添加 ServiceWorker'
          },
          {
            version: '0.3.1',
            date: '2017-07-18',
            desc: '优化 后端部分api 友链投入使用 | 修复⛏  bug'
          },
          {
            version: '0.3.0',
            date: '2017-07-16',
            desc: '添加 主题系统Part 1'
          },
          {
            version: '0.2.5',
            date: '2017-07-14',
            desc: '添加 全局弹窗(Message)'
          },
          {
            version: '0.2.4',
            date: '2017-07-14',
            desc: '添加 全局弹窗(Alert, Confirm)'
          },
          {
            version: '0.2.2',
            date: '2017-07-11',
            desc: '添加 文章区分页功能'
          },
          {
            version: '0.2.0',
            date: '2017-07-09',
            desc: '添加 咕咕机功能 | 修复⛏  bug'
          },
          {
            version: '0.1.7',
            date: '2017-06-29',
            desc: '添加  友情链接 | 修改🖌  文章界面样式'
          },
          {
            version: '0.1.5',
            date: '2017-06-26',
            desc: '添加  代码高亮插件 | 修复⛏  bug'
          },
          {
            version: '0.1.4',
            date: '2017-06-07',
            desc: '添加  番剧更新功能 状态板联动番剧状态 | 修复⛏  若干bug'
          },
          {
            version: '0.1.3',
            date: '2017-06-05',
            desc: '添加  番剧列表接入api 番剧查询添加 | 补全📝  所有看过的番 | 修复⛏  若干bug'
          },
          {
            version: '0.1.0',
            date: '2017-05-29',
            desc: '强行上线_(:з」∠)_❤️'
          },
          {
            version: '0.0.13',
            date: '2017-05-26',
            desc: '添加  天气系统接入api | 采用☑️ history api'
          },
          {
            version: '0.0.12',
            date: '2017-05-25',
            desc: '添加  一些细小的动画，状态板接入api'
          },
          {
            version: '0.0.11',
            date: '2017-05-25',
            desc: '添加  文章内容部分，markdown解析'
          },
          {
            version: '0.0.10',
            date: '2017-05-24',
            desc: '调试 文章区域接入api'
          },
          {
            version: '0.0.9',
            date: '2017-05-23',
            desc: '改进🛠  部署流程 | 添加  进度条 天气模块'
          },
          {
            version: '0.0.8',
            date: '2017-05-22',
            desc: '添加  后台管理页面 | 添加  文章管理功能'
          },
          {
            version: '0.0.7',
            date: '2017-05-16',
            desc: 'Make api works'
          },
          {
            version: '0.0.6',
            date: '2017-05-11',
            desc: '添加  hitokoto api | 使用 fetch'
          },
          {
            version: '0.0.5',
            date: '2017-05-10',
            desc: '添加  article(demo)组件 修复⛏  bug'
          },
          {
            version: '0.0.4',
            date: '2017-05-09',
            desc: '添加  bangumi/Aplayer组件'
          },
          {
            version: '0.0.3',
            date: '2017-05-08',
            desc: '添加  about/status-panel/tag组件'
          },
          {
            version: '0.0.2',
            date: '2017-05-06',
            desc: '添加  header/footer/homepage组件'
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
