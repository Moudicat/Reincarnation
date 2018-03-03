<template>
  <div class="status-panel">
    <h3>状态板</h3>
    <ul class="status-panel-list">
      <li v-for="(state, index) in status" :key="index">
        {{state.name}}
        <r-tag :type="typeMap[index%5]" :num="state.num" v-if="state.num">{{state.content}}</r-tag>
        <r-tag :type="typeMap[index%5]" v-else>{{state.content}}</r-tag>
      </li>
      <li>
        博客版本
        <r-tag type=“gray” v-if="version">{{ version }}</r-tag>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import pkg from '../../../package.json'; // eslint-disable-line
  import Status from 'services/status';
  import Tag from 'components/tag';

  export default {
    data() {
      return {
        typeMap: ['orange', 'green', 'red', 'blue', 'gray'],
        status: [],
        version: pkg.version
      };
    },
    mounted() {
      Status.get()
        .then(response => {
          if (response.data && response.data.status) {
            this.$store.commit('global/SET_STATUS', response.data.status);
            this.status = response.data.status;
          } else {
            this.status.push({
              name: '获取数据失败',
              content: '....'
            });
          }
        })
        .catch(err => {
          this.status.push({
            name: '获取数据失败',
            content: err.message
          });
        });
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
