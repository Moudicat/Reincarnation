<template>
  <div class="wakatime-panel">
    <h3>这周摸鱼了吗？</h3>
    <ul v-if="wakatime.length">
      <li class="wakatime-item" v-for="(data, index) in wakatime" :key="index">
        <r-tag type="gray">{{ data.range.date }}</r-tag>  <r-tag class="fr" :type="getType(data.grand_total.hours)">{{`${data.grand_total.hours}小时${data.grand_total.minutes}分钟`}}</r-tag>
      </li>
    </ul>
    <div v-else>获取数据中...</div>

    <p class="wakatime-description">*以上数据统计的是编辑器打开的时间</p>
  </div>
</template>

<script type="text/ecmascript-6">
  import { jsonp } from 'services/utils';
  import Tag from 'components/tag';

  export default {
    data() {
      return {
        wakatime: []
      };
    },

    methods: {
      getType(hours) {
        hours = Number(hours);
        if (hours >= 8) {
          return 'red';
        } else if (hours >= 4) {
          return 'orange';
        } else {
          return 'green';
        }
      }
    },

    mounted() {
      jsonp('https://wakatime.com/share/@Moudicat/b20df7dc-03e8-4c60-91dd-4406c1f52b2a.json?callback=func&random=' + Math.random(), 'func')
        .then(res => {
          this.wakatime = res.data;
        })
        .catch(() => {});
    },

    components: {
      'r-tag': Tag
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .wakatime-panel {
    padding: 20px;
    border: 1px solid #d1dbe5;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .11), 0 0 4px 0 rgba(0, 0, 0, .04);
    > h3 {
      font-size: 18px;
    }

    .fr {
      float: right;
    }

    .wakatime-item {
      margin: 5px;
    }

    .wakatime-description {
      margin-top: 10px;
      font-size: 12px;
    }

  }
</style>
