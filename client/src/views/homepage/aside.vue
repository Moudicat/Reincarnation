<template>
  <aside>
    <StatusPanel />
    <div class="aplayer-test">
      <p style="text-align: center;">播放器与云储存服务测试</p>
      <Aplayer :music="{
        title: 'Fly',
        author: 'Ludovico Einaudi',
        url: 'http://moudicat-data.oss-cn-beijing.aliyuncs.com/music/Ludovico%20Einaudi%20-%20Fly.mp3',
        pic: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=4116671072,3147142947&fm=58',
        }" preload="none"/>
    </div>
  </aside>
</template>

<script type="text/ecmascript-6">
  import StatusPanel from 'views/status-panel';
  import Aplayer from 'vue-aplayer';

  export default {
    components: {
      StatusPanel,
      Aplayer
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
