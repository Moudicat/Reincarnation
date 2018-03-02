<template>
  <li class="article-list-item">
    <h3 @click="handleOpenArticle">{{article.title}}<span></span></h3>
    <time><i class="icon-clock"></i> {{article.postTime | time}}</time>
    <div class="tags-wrapper">
      <span 
        class="tag" 
        v-for="(tag, index) in article.tags" 
        :key="tag" 
        @click.stop="handleOpenArticleTagMode(tag)"
        :style="{'animation-delay': (index * 0.1 + 0.4) + 's'}"
        ><span class="tag-prefix">显示以</span>{{ tag }}<span class="tag-suffix">为关键词的文章</span>  </span>
    </div>
    <p class="desc">{{article.description}}</p>
    <div class="pic-wrapper">
      <img v-lazy="article.banner" alt="article-pic" class="pic" @click.stop="handlePicClick">
    </div>
  </li>
</template>

<script type="text/ecmascript-6">
  import {formatDate} from 'services/utils';
  export default {
    name: 'articleListItem',
    props: {
      article: Object
    },
    data() {
      return {};
    },
    methods: {
      handlePicClick(ev) {
        const wrapper = ev.target.parentNode;
        const height = getComputedStyle(wrapper).height;
        const targetHeight = getComputedStyle(ev.target).height;
        if (Math.ceil(parseFloat(height)) >= parseFloat(targetHeight)) {
          wrapper.style.maxHeight = '340px';
        } else {
          wrapper.style.maxHeight = targetHeight;
        }
      },
      handleOpenArticle() {
        this.$router.push('/article/' + this.article._id);
      },
      handleOpenArticleTagMode(tag) {
        this.$event.$emit('onArticleTagMode', tag);
      }
    },
    filters: {
      time(data) {
        return formatDate(new Date(data), 'yyyy-MM-dd hh:mm:ss');
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .article-list-item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 150px;
    padding: 35px 30px 20px;
    transition: .3s;
    border-bottom: 1px solid #e6ecf0;
    text-align: center;
    overflow: hidden;
    &:hover {
      background-color: $secondary-background;
    }
    > h3 {
      position: relative;
      padding: 10px;
      font-size: 30px;
      color: $primary-text;
      transition: .3s;
      cursor: pointer;
      &::before, &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 2px;
        width: 0;
        transition: .4s .4s;
      }
      &::after {
        left: inherit;
        top: inherit;
        right: 0;
        bottom: 0;
      }
      &:hover::before, &:hover::after {
        width: 3%;
        background-color: #ff9f71;
        transition: .3s;
      }
      &:hover {
        background-color:$primary-background;
        color: #ef3d13;
        box-shadow: 1px 3px 5px 2px #eee;
        > span::before, > span::after {
          height: 50%;
          background-color: #ff9f71;
          transition: .2s;
        }
      }
      > span {
        &::before, &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 0;
          width: 2px;
          transition: .4s;
        }
        &::after {
          left: inherit;
          top: inherit;
          right: 0;
          bottom: 0;
        }
      }
    }
    > time {
      margin: 10px 0 15px 0;
      font-size: 14px;
      color: rgba(50, 50, 50, .7);
      white-space: nowrap;
      > i {
        vertical-align: baseline;
      }
    }

    .tags-wrapper {
      position: absolute;
      left: 10px;
      top: 0;
      .tag {
        position: relative;
        display: inline-block;
        margin: 0 5px;
        padding: 4px 4px 4px;
        font-size: 14px;
        background: #e74b4b;
        color: #fff;
        border-radius: 0 0 4px 4px;
        transition: .3s cubic-bezier(.62, .02, .34, 1);
        animation: fade-in .3s backwards;
        cursor: pointer;
        overflow: hidden;

        .tag-prefix,
        .tag-suffix {
          position: absolute;
          top: 4px;
          opacity: 0;
          transition: .2s .1s;
        }

        .tag-prefix {
          left: 3px;
        }
        .tag-suffix {
          right: 3px;
        }

        &:hover {
          padding-left: 48px;
          padding-right: 105px;
          
          .tag-prefix,
          .tag-suffix {
            opacity: 1;
          }
        }
      }
    }
    .desc {
      line-height: 28px;
      text-indent: 2em;
      text-align: left;
    }
    .pic-wrapper {
      max-width: 70%;
      max-height: 340px;
      border-radius: 5px;
      margin: 20px auto;
      border: 1px solid rgba(0, 0, 0, .1);
      overflow: hidden;
      cursor: pointer;
      transition: .3s cubic-bezier(.64, .02, .68, .99);
      .pic {
        width: 100%;
      }
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
</style>
