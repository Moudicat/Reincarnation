<template>
  <div>
    <transition name="fade">
      <div class="article-list-wrapper">
        <div class="article-list-header">
          <ul>
            <li>
              <router-link to="/">公开文章</router-link>
            </li>
            <li>
              <router-link to="/post-it-note" @click.native="handleClick">便利贴</router-link>
            </li>
          </ul>
        </div>
        <div class="article-list">
          <ol v-if="articleList.length">
            <ArticleListItem v-for="(article, index) in articleList" :key="index" :article="article" />
          </ol>
          <h3 class="info" v-else><i class="icon-smile"></i>{{articleListHolder}}</h3>
        </div>
      </div>
    </transition>
    <div class="pagination-wrapper">
      <el-pagination
        layout="total, prev, pager, next"
        :page-size="PAGE_LIMIT"
        :total="total"
        @current-change="handleCurrentChange">
      </el-pagination>
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
        PAGE_LIMIT: 5,
        PAGE: 1,
        articleList: [],
        articleListHolder: '抓取数据中...',
        total: 0
      };
    },
    methods: {
      handleClick() {
        this.$alert('抱歉，该功能尚未开发完毕');
      },
      handleCurrentChange(currentPage) {
        this.PAGE = currentPage;
        this.fetchArticle();
      },
      fetchArticle() {
        Article.get(this.START, this.PAGE_LIMIT)
          .then(response => {
            if (response.data) {
              if (!response.data.length) this.articleListHolder = '暂无文章~';
              this.articleList.splice(0, this.articleList.length, ...response.data);
            }
          })
          .catch(() => {
            this.articleListHolder = '抱歉，获取数据失败...';
          });
      }
    },
    computed: {
      START() {
        return (this.PAGE - 1) * this.PAGE_LIMIT;
      }
    },
    beforeMount() {
      Article.count()
        .then(response => {
          response.data && (this.total = response.data);
        });
      this.fetchArticle();
    },
    components: {
      ArticleListItem
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .article-list-wrapper {
    position: relative;
    z-index: 800;
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
      .info {
        padding: 10px;
        text-align: center;
        i {
          margin-right: 5px;
          vertical-align: middle;
        }
      }
    }
  }
  .pagination-wrapper {
    margin: 30px 10px;
    text-align: right;
  }
</style>
