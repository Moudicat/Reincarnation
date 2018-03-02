<template>
  <div class="article-list-wrapper">
    <div class="article-list-header">
      <ul>
        <li>
          <router-link to="/" @click.native="exitTagMode()">公开文章</router-link>
        </li>
        <li>
          <router-link to="/" @click.native="enterTagMode('技术半月刊')">技术半月刊</router-link>
        </li>
        <li>
          <router-link to="/" @click.native="handleClick">便利贴</router-link>
        </li>
        <li>
          <span class="tag-filter" @click="exitTagMode()" v-if="articleTagMode">取消浏览以 {{articleTagFilter}} 为主题的文章</span>
        </li>
      </ul>
    </div>
    <div class="article-list">
      <transition-group name="fade-top" tag="ol" v-if="articleList.length">
        <ArticleListItem v-for="(article, index) in articleList" v-if="articleListAnimationIndex >= index" :key="index" :article="article" />
      </transition-group>
      <h3 class="info" v-else><i class="icon-smile"></i>{{articleListHolder}}</h3>
    </div>
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
  import { scrollToTop } from 'services/utils';

  export default {
    name: 'ArticleList',
    data() {
      return {
        PAGE_LIMIT: 5,
        PAGE: 1,
        articleList: [],
        articleListHolder: '抓取数据中...',
        total: 0,
        articleListAnimationIndex: -1,
        articleTagMode: false,
        articleTagFilter: '',
        articleStatusBackup: null
      };
    },
    methods: {
      handleClick() {
        this.$alert('抱歉，该功能尚未开发完毕');
      },

      handleCurrentChange(currentPage) {
        this.PAGE = currentPage;
        this.fetchArticle();
        scrollToTop();
      },

      fetchArticle() {
        if (this.articleTagMode) {
          Article.getByTags(this.articleTagFilter, this.START, this.PAGE_LIMIT)
            .then(response => {
              if (response.data) {
                if (!response.data.length) this.articleListHolder = '此分类暂无文章';
                this.articleList.splice(0, this.articleList.length, ...response.data);
                this.showAnimation();
                scrollToTop(370, 370);
              }
            })
            .catch(() => {
              this.articleListHolder = '抱歉，获取数据失败...';
            });
        } else {
          Article.get(this.START, this.PAGE_LIMIT)
            .then(response => {
              if (response.data) {
                if (!response.data.length) this.articleListHolder = '暂无文章';
                this.articleList.splice(0, this.articleList.length, ...response.data);
                this.showAnimation();
                scrollToTop(370, 370);
              }
            })
            .catch(() => {
              this.articleListHolder = '抱歉，获取数据失败...';
            });
        }
      },

      resetArticleStatus() {
        this.PAGE_LIMIT = 5;
        this.PAGE = 1;
        this.articleList.splice(0, this.articleList.length);
        this.total = 0;
        this.articleListAnimationIndex = -1;
      },

      showAnimation() {
        let animationIndexTimer = setInterval(() => {
          this.articleListAnimationIndex++;
          if (this.articleListAnimationIndex >= this.PAGE_LIMIT) {
            clearInterval(animationIndexTimer);
          }
        }, 300);
      },

      exitTagMode() {
        this.articleTagMode = false;
        this.articleTagFilter = '';
        this.reloadList();
      },

      enterTagMode(tag) {
        this.$event.$emit('onArticleTagMode', tag);
      },

      reloadList() {
        this.resetArticleStatus();
        Article.count()
          .then(response => {
            response.data && (this.total = response.data);
            this.fetchArticle();
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
          this.fetchArticle();
        });

      this.$event.$on('onArticleTagMode', tag => {
        this.articleTagMode = true;
        this.articleTagFilter = tag;
        this.articleStatusBackup = {
          PAGE_LIMIT: this.PAGE_LIMIT,
          PAGE: this.PAGE,
          articleList: JSON.parse(JSON.stringify(this.articleList)),
          total: this.total
        };

        this.resetArticleStatus();

        Article.countByTags(tag)
          .then(response => {
            response.data && (this.total = response.data);
            this.fetchArticle();
          });
      });
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
    flex: 1;
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
          a {
            color: $secondary-text;
          }
          a.active {
            color: $primary-text;
          }
        }
      }

      .tag-filter {
        &:hover {
          text-decoration: line-through;
          cursor: pointer;
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
