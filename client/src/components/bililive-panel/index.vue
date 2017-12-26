<template>
  <div class="bililive-panel" v-if="bililiveInfo.length">
    <h3>哔哩哔哩直播</h3>

    <div class="live-card" v-for="liveInfo in bililiveInfo" :key="liveInfo.roomid">
      <h4>{{liveInfo.data.title}}[{{liveInfo.roomid}}]</h4>
      <p>直播分区：{{liveInfo.data.parent_area_name}}-{{liveInfo.data.area_name}}</p>
      <p>{{ liveInfo.data.live_status ? '直播中' : '未直播' }}</p>
      <img :src="liveInfo.data.user_cover" alt="live-cover">
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
      };
    },

    beforeMount() {
      this.$event.$on('onBililive', data => {
        this.bililiveInfo.forEach((live, index) => {
          if (live.roomid === data.roomid) {
            let tempInfo = this.bililiveInfo.concat();
            tempInfo[index] = data;
            this.$store.commit('components/SET_BILILIVEINFO', tempInfo);
          }
        });
      });
    },
    
    computed: {
      bililiveInfo() {
        return this.$store.state.components.bililiveInfo;
      }
    }

  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .bililive-panel {
    padding: 20px;
    border: 1px solid #d1dbe5;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .11), 0 0 4px 0 rgba(0, 0, 0, .04);
    > h3 {
      font-size: 18px;
    }
    
    .live-card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 10px auto;
      img {
        width: 258px;
      }
    }
  }
</style>
