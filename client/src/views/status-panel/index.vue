<template>
  <div class="status-panel">
    <h3>状态板</h3>
    <span>最后更新于 <r-tag type="gray"><time>2017-05-08</time></r-tag></span>
    <ul class="status-panel-list">
      <li>
        目前所在地
        <r-tag type="green">帝都</r-tag>
      </li>
      <li>
        最近的状态
        <r-tag type="orange">akwww</r-tag>
      </li>
      <li>
        最近看的番
        <r-tag type="red" :num="5">从零开始的魔法书</r-tag>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import Tag from 'components/tag';
  export default {
    components: {
      rTag: Tag
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .status-panel {
    position: relative;
    padding: 20px;
    border: 1px solid #d1dbe5;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .11), 0 0 4px 0 rgba(0, 0, 0, .04);
    > h3 {
      font-size: 18px;
    }
    > span {
      display: block;
      font-size: 12px;
      text-align: center;
      margin: 5px 0 10px 0;
    }
    .status-panel-list {
      line-height: 38px;
      .tag {
        position: absolute;
        margin-top: 6px;
        left: 50%;
      }
    }
  }
</style>
