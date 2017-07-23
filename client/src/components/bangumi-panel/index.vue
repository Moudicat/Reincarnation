<template>
  <div class="bangumi-panel">
    <h3>最近看的番</h3>
    <r-tag type="blue" :num="bangumi.num" v-if="bangumi.name"><router-link to="/animation">{{bangumi.content}}</router-link></r-tag>
  </div>
</template>

<script type="text/ecmascript-6">
  import Tag from 'components/tag';

  export default {
    computed: {
      bangumi() {
        let b = {};
        if (this.$store.state.global.status) {
          this.$store.state.global.status.some(e => {
            if (e.name === '最近看的番') {
              b = e;
              return true;
            }
          });
          return b;
        }
      }
    },
    components: {
      rTag: Tag
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .bangumi-panel {
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
  }
</style>
