<template>
  <div class="bangumi-panel">
    <h3>最近看的番</h3>
    <r-tag type="blue" :num="Number(latest.episode)" v-if="latest.name"><router-link to="/animation">{{latest.name}}</router-link></r-tag>
  </div>
</template>

<script type="text/ecmascript-6">
  import Animation from 'services/animation';
  import Tag from 'components/tag';

  export default {
    data() {
      return {
        latest: {}
      };
    },

    beforeMount() {
      Animation.getLatest()
        .then(res => {
          this.latest = res.data[0];
        })
        .catch(err => {
          console.log(err);
        });
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
