<template>
  <div class="weather-panel">
    <h3>圣都月之森实时天气情况</h3>
    <span>当地时间 <r-tag type="gray"><time>教会历1年1月4日 08:45:10</time></r-tag></span>
    <ul class="weather-panel-list">
      <li>
        温度
        <r-tag>41.8℃</r-tag>
      </li>
      <li>
        季节
        <r-tag>夏季</r-tag>
      </li>
      <li>
        天气
        <r-tag>晴</r-tag>
      </li>
      <li>
        天气预警
        <r-tag type="red">高温预警</r-tag>
      </li>
      <li>TODO: 此处是动态的 <br /> 进度：后端基本完成 调试中</li>
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
  .weather-panel {
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
    .weather-panel-list {
      line-height: 38px;
      .tag {
        position: absolute;
        margin-top: 6px;
        left: 50%;
      }
    }
  }
</style>
