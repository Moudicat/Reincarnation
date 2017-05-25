<template>
  <div class="status-panel">
    <h3>状态板</h3>
    <ul class="status-panel-list">
      <li v-for="(state, index) in status" :key="index">
        {{state.name}}
        <r-tag :type="typeMap[index%5]" :num="state.num" v-if="state.num">{{state.content}}</r-tag>
        <r-tag :type="typeMap[index%5]" v-else>{{state.content}}</r-tag>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import Tag from 'components/tag';
  export default {
    data() {
      return {
        typeMap: ['orange', 'green', 'red', 'blue', 'gray'],
        status: [
          {
            name: '目前所在地',
            content: '帝都'
          },
          {
            name: '最近的状态',
            content: 'akwww'
          },
          {
            name: '最近看的番',
            content: '从零开始的魔法书',
            num: 7
          }
        ]
      };
    },
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
