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
  import Article from 'services/article';
  export default {
    name: 'ArticleList',
    data() {
      return {
        articleList: []
      };
    },
    methods: {
      handleClick() {
        alert('抱歉，该功能尚未开发完毕');
        this.$router.push('/index');
      }
    },
    beforeMount() {
      Article.list()
        .then(response => {
          console.log(response.data);
          this.articleList.splice(0, this.articleList.length, ...response.data);
        })
        .catch(err => {
          console.error(err);
        });
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
