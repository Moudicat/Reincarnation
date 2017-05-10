<template>
  <div class="article-list-wrapper">
    <div class="article-list-header">
      <ul>
        <li>
          <router-link to="/index">公开文章</router-link>
        </li>
        <li>
          <router-link to="/index/post-it-note" @click.native="handleClick">便利贴</router-link>
        </li>
      </ul>
    </div>
    <div class="article-list">
      <ol>
        <ArticleListItem v-for="(article, index) in articleList" :key="index" :article="article"/>
      </ol>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ArticleListItem from 'views/homepage/articleListItem';
  export default {
    name: 'ArticleList',
    data() {
      return {
        articleList: [
          {
            _id: 'askuhgoiih2i3u4g3i4g6b5i23h56',
            title: '我的个人博客',
            time: '2017-05-02',
            desc: '阿苏看到过或少地枫哥喝受地方哈公司',
            img: 'https://pbs.twimg.com/media/C_JpDyhV0AEgVsi.jpg'
          },
          {
            _id: 'askuhgoiih2i3u4g3i4g6b5i23h56',
            title: '趣味组红豆‏ @jeconxis',
            time: '2017-05-03',
            desc: '村委会选举候选人好无礼，一打开门直接就上楼说进门拉票了，还没说给你进来呢，做邻居十几年你们都没进过我二楼',
            img: 'https://pbs.twimg.com/media/C_IXTXbUIAIOqH7.jpg'
          },
          {
            _id: 'askuhgoiih2i3u4g3i4g6b5i23h56',
            title: 'めしまさん‏ @meshima0',
            time: '2017-05-04',
            desc: '既読感覚でいいねくれると嬉しいですﾍﾟｺﾘ(..  )♡ いいね押してくれる人すき😘💗',
            img: 'https://pbs.twimg.com/media/C_E36DzVYAARJlk.jpg'
          },
          {
            _id: 'askuhgoiih2i3u4g3i4g6b5i23h56',
            title: '上推且谢顶的叔atkio‏ @atkio ',
            time: '2017-05-05',
            desc: `日本某推友女装回老家，给了外甥一台switch。 第二天换回男装后，外甥问昨天那个姐姐呢？ 答：在浴室化掉了。。外甥哭了一个小时`,
            img: 'https://pbs.twimg.com/media/C_HMFMEVwAA0J2o.jpg'
          },
          {
            _id: 'askuhgoiih2i3u4g3i4g6b5i23h56',
            title: '28小盆友‏ @chengr28 ',
            time: '2017-05-06',
            desc: '之前觉得骚尼说 Hi-Res 实际上是 CD 音质不好，后来发现虽然价格高但起码能达到 CD 水平……掐指一算，家里能放音乐的：手提电脑 Conexant 加了特效，老平板 SRC 问题严重，新平板的声音居然一点低音都没有……这已经不是玄学的问题，想听个音乐就这么难吗 =_/=',
            img: 'https://pbs.twimg.com/media/C_I-G69VwAEz6_t.png'
          }
        ]
      };
    },
    methods: {
      handleClick() {
        alert('抱歉，该功能尚未开发完毕');
        this.$router.push('/index');
      }
    },
    components: {
      ArticleListItem
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .article-list-wrapper {
    flex: auto;
    margin: 10px 0 5px 5px;
    .article-list-header {
      margin-bottom: -1px;
      background-color: #fff;
      border: 1px solid #e6ecf0;
      border-radius: 5px 5px 0 0;
      ul {
        display: flex;
        > li {
          padding: 15px 20px;
          font-size: 16px;
          line-height: 1;
          a.active {
            color: #ff9f71;
          }
        }
      }
    }
    .article-list {
      border: 1px solid #e6ecf0;
      border-radius: 0 0 5px 5px;
      background-color: #fff;
    }
  }
</style>
