<template>
  <Layout>
    <div slot="content" class="lanlan c">
      <p class="b">亲爱的懒懒：</p>
      <p class="margin-top b">🎂祝你16岁生日快乐！🎂</p>
      <div class="time-wrap margin-top">距第一次见面已经过了<span>{{firstMeet}}</span></div>
      <p>可能我们很早之前就见过，当时看见你的名字就有点喜欢你了，慢慢了解下来发现咱俩的兴趣爱好重合度还蛮高的，特别是能吃到一块去，还记得之前我发了条想吃糖醋排骨朋友圈吗，其实只有你可见哈哈哈。</p>
      <p class="margin-top">想和你过未来的每个生日，和你在一起真的很开心很幸福，爱你❤~</p>
      <br />
      <p>PS.本来准备能更充分一些的，可是最近太忙啦。不过我放了一个东西在<span class="r">放着你照片的机器人右手所指的方向</span>，去找找吧 嘿嘿</p>
      <br />
      <p style="text-align: right;">爱你的黏黏</p>
    </div>
  </Layout>
</template>
 
<script>
import Layout from 'views/layout';

export default {
  data() {
    return {
      firstMeet: ''
    };
  },
  computed: {},
  created() {
    this.getFirstMeet();
    setInterval(this.getFirstMeet, 1000);
  },
  methods: {
    getFirstMeet() {
      const startTime = +new Date('2019-11-06 10:00:00');
      const currentDate = +new Date();

      let diff = (currentDate - startTime) / 1000;

      let seconds = parseInt(diff % 60);
      if (seconds < 10) seconds = '0' + seconds;
      diff = parseInt(diff / 60);
      let minutes = diff % 60;
      if (minutes < 10) minutes = '0' + minutes;
      diff = parseInt(diff / 60);
      let hours = diff % 24;
      if (hours < 10) hours = '0' + hours;
      diff = parseInt(diff / 24);
      let days = diff;

      this.firstMeet = `${days}天${hours}小时${minutes}分钟${seconds}秒`;
    }
  },
  components: {
    Layout
  }
};
</script>
 
<style lang='scss' scoped>
.lanlan {
  padding: 20px;
  font-size: 14px;
  .b {
    font-size: 16px;
  }
  .r {
    color: rgb(228, 110, 110);
  }
}
</style>