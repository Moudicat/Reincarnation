<template>
  <div class="bililive-panel" v-if="bililiveInfo.length">
    <h3>哔哩哔哩直播</h3>

    <div class="live-card" v-for="liveInfo in bililiveInfo" :key="liveInfo.roomid" @click="gotobiliLive(liveInfo.roomid)">
      <span class="live-status" :class="{'live': liveInfo.data.live_status === 1}">{{ liveInfo.data.live_status ? '直播中' : '闲置' }}</span>
      <span class="live-area">{{liveInfo.data.parent_area_name}}-{{liveInfo.data.area_name}}</span>
      <img class="live-cover" :src="liveInfo.data.user_cover" alt="live-cover">
      <div class="live-desc">
        <span class="live-title">{{liveInfo.data.title}}</span>
        
        <span class="live-roomid">{{liveInfo.roomid}}</span>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
      };
    },

    methods: {
      gotobiliLive(roomid) {
        window.open(`https://live.bilibili.com/${roomid}`);
      }
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
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 10px auto;
      box-shadow: $secondary-boxshadow;
      background: $secondary-background;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;
      img {
        width: 100%;
      }
      .live-status {
        position: absolute;
        top: 5px;
        left: 10px;
        padding: 4px;
        border-radius: 4px;
        font-size: 14px;
        background-color: rgb(92, 92, 92);
        color: #fff;
        &.live {
          background-color: rgb(231, 75, 75);
        }
      }
      .live-area {
        position: absolute;
        top: 5px;
        right: 10px;
        padding: 5px;
        background: rgba(255,255,255,.8);
        border-radius: 6px;
        font-size: 12px;
      }
      .live-desc {
        padding: 5px;
        .live-title {

        }
        .live-roomid {
          float: right;
        }
      }
    }
  }
</style>
